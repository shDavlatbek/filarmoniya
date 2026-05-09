"""HTML rich-text -> structured block list converter.

The Next.js frontend's `renderBlock` function expects an array of blocks shaped
like:

    {type: 'paragraph', text}
    {type: 'heading', level, text}
    {type: 'image', src, alt, caption}
    {type: 'gallery', images: [{src, alt, caption}, ...]}
    {type: 'quote', text, cite}
    {type: 'list', ordered, items: [str, ...]}

Admins enter rich HTML in CKEditor5; on save the parser walks the HTML and
emits the JSON the frontend already speaks. Adjacent figures are auto-collected
into a gallery. Empty paragraphs are dropped.
"""
from __future__ import annotations

import re
from typing import Iterable

from bs4 import BeautifulSoup, NavigableString, Tag

_WHITESPACE_RE = re.compile(r'\s+')


def _clean_text(text: str) -> str:
    return _WHITESPACE_RE.sub(' ', text or '').strip()


def _inline_html(tag: Tag) -> str:
    """Return decoded inner HTML, preserving inline formatting like <strong>."""
    return _clean_text(''.join(str(c) for c in tag.children))


def _parse_image_figure(figure: Tag) -> dict | None:
    img = figure.find('img')
    if not img or not img.get('src'):
        return None
    cap = figure.find('figcaption')
    return {
        'src': img.get('src'),
        'alt': _clean_text(img.get('alt') or ''),
        'caption': _clean_text(cap.get_text(' ', strip=True)) if cap else '',
    }


def _parse_list(tag: Tag) -> dict:
    items = [
        _inline_html(li) for li in tag.find_all('li', recursive=False)
    ]
    return {
        'type': 'list',
        'ordered': tag.name == 'ol',
        'items': [i for i in items if i],
    }


def _parse_quote(tag: Tag) -> dict:
    cite_tag = tag.find('cite')
    cite = _clean_text(cite_tag.get_text(' ', strip=True)) if cite_tag else ''
    if cite_tag:
        cite_tag.extract()
    text = _clean_text(tag.get_text(' ', strip=True))
    return {'type': 'quote', 'text': text, 'cite': cite}


def _heading_level(name: str) -> int:
    try:
        return int(name[1])
    except (ValueError, IndexError):
        return 2


def html_to_blocks(html: str) -> list[dict]:
    """Convert CKEditor HTML to the frontend's block JSON shape."""
    if not html or not html.strip():
        return []

    soup = BeautifulSoup(html, 'lxml')
    body = soup.body or soup

    blocks: list[dict] = []
    figure_buffer: list[dict] = []

    def flush_figures():
        if not figure_buffer:
            return
        if len(figure_buffer) == 1:
            blocks.append({'type': 'image', **figure_buffer[0]})
        else:
            blocks.append({'type': 'gallery', 'images': list(figure_buffer)})
        figure_buffer.clear()

    for node in body.children:
        if isinstance(node, NavigableString):
            text = _clean_text(str(node))
            if text:
                flush_figures()
                blocks.append({'type': 'paragraph', 'text': text})
            continue

        if not isinstance(node, Tag):
            continue

        name = node.name.lower()

        if name == 'figure':
            classes = node.get('class') or []
            if 'gallery' in classes:
                items = [
                    _parse_image_figure(child)
                    for child in node.find_all('figure', recursive=True)
                ]
                items = [i for i in items if i]
                if items:
                    flush_figures()
                    blocks.append({'type': 'gallery', 'images': items})
                continue
            parsed = _parse_image_figure(node)
            if parsed:
                figure_buffer.append(parsed)
            continue

        flush_figures()

        if name in ('p',):
            text = _inline_html(node)
            stripped = _clean_text(node.get_text(' ', strip=True))
            if stripped:
                blocks.append({'type': 'paragraph', 'text': text})
            continue

        if name in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            text = _clean_text(node.get_text(' ', strip=True))
            if text:
                blocks.append({
                    'type': 'heading',
                    'level': _heading_level(name),
                    'text': text,
                })
            continue

        if name in ('ul', 'ol'):
            blocks.append(_parse_list(node))
            continue

        if name == 'blockquote':
            blocks.append(_parse_quote(node))
            continue

        if name == 'img' and node.get('src'):
            blocks.append({
                'type': 'image',
                'src': node.get('src'),
                'alt': _clean_text(node.get('alt') or ''),
                'caption': '',
            })
            continue

        # Fallback: treat unknown block tags as paragraphs of their text
        text = _clean_text(node.get_text(' ', strip=True))
        if text:
            blocks.append({'type': 'paragraph', 'text': text})

    flush_figures()
    return blocks


def blocks_to_plain(blocks: Iterable[dict]) -> str:
    """Concatenate text content of blocks for excerpts/search."""
    parts: list[str] = []
    for block in blocks or []:
        t = block.get('type')
        if t in ('paragraph', 'heading', 'quote'):
            parts.append(_clean_text(block.get('text', '')))
        elif t == 'list':
            parts.extend(_clean_text(i) for i in block.get('items', []))
        elif t == 'image':
            parts.append(_clean_text(block.get('caption', '')))
        elif t == 'gallery':
            parts.extend(_clean_text(i.get('caption', '')) for i in block.get('images', []))
    return ' '.join(p for p in parts if p)
