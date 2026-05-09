"""Parse a single CKEditor HTML blob into the chaptered-document JSON shape.

Editor convention (admin types this in one rich-text field):

    <h2>I bob — Umumiy qoidalar</h2>
    <h3>1-modda</h3>
    <p>Paragraph 1 ...</p>
    <p>Paragraph 2 ...</p>
    <h3>2-modda</h3>
    <p>Filarmoniyaning asosiy vazifalari quyidagilardan iborat:</p>
    <ul>
      <li>milliy musiqa rivojlantirish;</li>
      <li>...</li>
    </ul>

Output (matches the legacy frontend shape exactly):

    [
      {
        "id": "i", "number": "I bob", "title": "Umumiy qoidalar",
        "articles": [
          {"number": "1", "intro": "", "paragraphs": ["Paragraph 1 ...", "Paragraph 2 ..."]},
          {"number": "2", "intro": "Filarmoniyaning ... iborat:", "paragraphs": ["milliy ...", "..."]}
        ]
      },
      ...
    ]

Rules:
  - <h1>/<h2> = chapter boundary. Title format: "<NUMBER> — <TITLE>" (em-dash, en-dash,
    or hyphen all accepted). If no separator, the whole heading becomes the title.
  - <h3>/<h4> = article boundary. The heading text is the article number/label.
  - Inside an article: <p> and <li> elements become paragraphs.
  - The FIRST <p> in an article that ends with ':' AND is followed by a list (<ul>/<ol>)
    becomes the article's intro; the list items become the paragraphs.
  - Empty / whitespace-only nodes are dropped.
  - A stable lowercase roman-numeral id ("i", "ii", "iii", ...) is auto-assigned to each
    chapter so old frontend URLs keep working.
"""
from __future__ import annotations

import re
from typing import Any, Iterable

from bs4 import BeautifulSoup, NavigableString, Tag

Chapter = dict[str, Any]
Article = dict[str, Any]

_ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x',
         'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx']

_SEPARATORS = (' — ', ' – ', ' - ')

_WS = re.compile(r'\s+')


def _clean(text: str) -> str:
    return _WS.sub(' ', text or '').strip()


def _split_chapter_heading(text: str) -> tuple[str, str]:
    text = _clean(text)
    for sep in _SEPARATORS:
        if sep in text:
            number, title = text.split(sep, 1)
            return _clean(number), _clean(title)
    # Fallback: leading "I bob"-style token
    m = re.match(r'^([IVXLCDM]+\s*bob|[IVXLCDM]+)\s+(.+)$', text, re.IGNORECASE)
    if m:
        return _clean(m.group(1)), _clean(m.group(2))
    return '', text


def _top_level_nodes(soup: BeautifulSoup) -> Iterable[Tag]:
    body = soup.body or soup
    for child in body.children:
        if isinstance(child, NavigableString):
            t = _clean(str(child))
            if t:
                p = soup.new_tag('p')
                p.string = t
                yield p
            continue
        if isinstance(child, Tag):
            yield child


def html_to_chapters(html: str | None) -> list[Chapter]:
    if not html or not html.strip():
        return []

    soup = BeautifulSoup(html, 'lxml')
    nodes = list(_top_level_nodes(soup))

    chapters: list[Chapter] = []
    current_chapter: Chapter | None = None
    current_article: Article | None = None

    def flush_article():
        nonlocal current_article
        if current_article is None:
            return
        if (
            current_article['paragraphs']
            or current_article['intro']
            or current_article['number']
        ):
            current_chapter['articles'].append(current_article)
        current_article = None

    def flush_chapter():
        nonlocal current_chapter
        flush_article()
        if current_chapter is not None and (
            current_chapter['title'] or current_chapter['articles']
        ):
            chapters.append(current_chapter)
        current_chapter = None

    i = 0
    while i < len(nodes):
        node = nodes[i]
        name = (node.name or '').lower()

        if name in ('h1', 'h2'):
            flush_chapter()
            number, title = _split_chapter_heading(node.get_text(' ', strip=True))
            idx = len(chapters)
            current_chapter = {
                'id': _ROMAN[idx] if idx < len(_ROMAN) else f'c-{idx + 1}',
                'number': number,
                'title': title,
                'articles': [],
            }
            i += 1
            continue

        if name in ('h3', 'h4'):
            if current_chapter is None:
                # Stray article heading without a chapter — synthesize one.
                idx = len(chapters)
                current_chapter = {
                    'id': _ROMAN[idx] if idx < len(_ROMAN) else f'c-{idx + 1}',
                    'number': '',
                    'title': '',
                    'articles': [],
                }
            flush_article()
            number_text = _clean(node.get_text(' ', strip=True))
            number_text = re.sub(r'(?i)[\s-]*modda\.?$', '', number_text).strip()
            current_article = {
                'number': number_text,
                'intro': '',
                'paragraphs': [],
            }
            i += 1
            continue

        # Body content — needs a current article to attach to
        if current_chapter is None:
            i += 1
            continue
        if current_article is None:
            current_article = {'number': '', 'intro': '', 'paragraphs': []}

        if name == 'p':
            text = _clean(node.get_text(' ', strip=True))
            if not text:
                i += 1
                continue
            # Intro detection: first p ending in ':' followed by a list.
            next_node = nodes[i + 1] if i + 1 < len(nodes) else None
            is_first = not current_article['intro'] and not current_article['paragraphs']
            if (
                is_first
                and text.endswith(':')
                and next_node is not None
                and (next_node.name or '').lower() in ('ul', 'ol')
            ):
                current_article['intro'] = text
                # Consume the list now
                for li in next_node.find_all('li', recursive=False):
                    item = _clean(li.get_text(' ', strip=True))
                    if item:
                        current_article['paragraphs'].append(item)
                i += 2
                continue
            current_article['paragraphs'].append(text)
            i += 1
            continue

        if name in ('ul', 'ol'):
            for li in node.find_all('li', recursive=False):
                item = _clean(li.get_text(' ', strip=True))
                if item:
                    current_article['paragraphs'].append(item)
            i += 1
            continue

        # Fallback: treat unknown blocks as paragraphs
        text = _clean(node.get_text(' ', strip=True))
        if text:
            current_article['paragraphs'].append(text)
        i += 1

    flush_chapter()
    return chapters


def chapters_to_html(chapters: list[Chapter]) -> str:
    """Inverse: serialize structured chapters back to a single HTML blob."""
    parts: list[str] = []
    for ch in chapters or []:
        number = (ch.get('number') or '').strip()
        title = (ch.get('title') or '').strip()
        if number and title:
            heading = f"{_esc(number)} — {_esc(title)}"
        else:
            heading = _esc(title or number)
        parts.append(f"<h2>{heading}</h2>")
        for art in ch.get('articles', []):
            num = _esc(art.get('number', '')).strip()
            parts.append(f"<h3>{num}-modda</h3>" if num else "<h3></h3>")
            intro = (art.get('intro') or '').strip()
            paragraphs = art.get('paragraphs') or []
            if intro and paragraphs:
                parts.append(f"<p>{_esc(intro)}</p>")
                items = ''.join(f"<li>{_esc(p)}</li>" for p in paragraphs)
                parts.append(f"<ul>{items}</ul>")
            else:
                if intro:
                    parts.append(f"<p>{_esc(intro)}</p>")
                for p in paragraphs:
                    parts.append(f"<p>{_esc(p)}</p>")
    return '\n'.join(parts)


def _esc(text: str) -> str:
    return (
        (text or '')
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
    )
