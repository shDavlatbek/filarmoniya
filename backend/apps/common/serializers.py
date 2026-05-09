"""Common serializer helpers."""


def absolute_url(request, url: str | None) -> str:
    """Make a media URL absolute (so the Next.js client can fetch from any origin)."""
    if not url:
        return ''
    if url.startswith(('http://', 'https://')):
        return url
    if request is not None:
        return request.build_absolute_uri(url)
    return url
