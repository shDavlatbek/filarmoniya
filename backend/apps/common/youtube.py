"""Extract a YouTube video id from any common URL form."""
import re
from urllib.parse import parse_qs, urlparse

# 11-char id used by YouTube — letters/digits/_/-
_ID_RE = re.compile(r'^[A-Za-z0-9_-]{11}$')


def extract_youtube_id(url: str) -> str:
    """Return the 11-char video id, or '' if it can't be parsed.

    Accepts:
        https://www.youtube.com/watch?v=<id>
        https://youtu.be/<id>
        https://www.youtube.com/embed/<id>
        https://www.youtube.com/shorts/<id>
        https://www.youtube.com/live/<id>
        plain '<id>'  (so admins who paste just the id still work)
    """
    if not url:
        return ''
    s = url.strip()
    if _ID_RE.match(s):
        return s

    try:
        parsed = urlparse(s)
    except ValueError:
        return ''

    host = (parsed.hostname or '').lower().lstrip('www.')

    if host == 'youtu.be':
        candidate = parsed.path.lstrip('/').split('/', 1)[0]
        return candidate if _ID_RE.match(candidate) else ''

    if host in ('youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com'):
        if parsed.path == '/watch':
            v = parse_qs(parsed.query).get('v', [''])[0]
            return v if _ID_RE.match(v) else ''
        for prefix in ('/embed/', '/shorts/', '/live/', '/v/'):
            if parsed.path.startswith(prefix):
                candidate = parsed.path[len(prefix):].split('/', 1)[0]
                return candidate if _ID_RE.match(candidate) else ''

    return ''
