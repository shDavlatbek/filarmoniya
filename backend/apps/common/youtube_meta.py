"""Fetch YouTube video metadata (title, duration, views, upload date, thumbnail)
without an API key, using yt-dlp.

The admin only types a YouTube URL; the model's `save()` calls
:func:`fetch_metadata` to populate any blank fields.
"""
from __future__ import annotations

import logging
from dataclasses import dataclass
from datetime import date
from typing import Optional

logger = logging.getLogger(__name__)


@dataclass
class VideoMeta:
    title: str = ''
    duration: str = ''       # formatted as "H:MM:SS" or "MM:SS"
    views: str = ''          # formatted as "124K" / "1.2M"
    upload_date: Optional[date] = None
    thumbnail_url: str = ''

    @property
    def has_any(self) -> bool:
        return bool(
            self.title or self.duration or self.views
            or self.upload_date or self.thumbnail_url
        )


def _format_duration(seconds: Optional[int]) -> str:
    if not seconds or seconds < 0:
        return ''
    h = seconds // 3600
    m = (seconds % 3600) // 60
    s = seconds % 60
    if h:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m}:{s:02d}"


def _format_views(count: Optional[int]) -> str:
    if count is None or count < 0:
        return ''
    if count < 1_000:
        return str(count)
    if count < 1_000_000:
        v = count / 1_000
        return f"{v:.1f}K".replace('.0K', 'K')
    if count < 1_000_000_000:
        v = count / 1_000_000
        return f"{v:.1f}M".replace('.0M', 'M')
    v = count / 1_000_000_000
    return f"{v:.1f}B".replace('.0B', 'B')


def _parse_upload_date(value: Optional[str]) -> Optional[date]:
    """yt-dlp returns 'YYYYMMDD' strings."""
    if not value or len(value) != 8 or not value.isdigit():
        return None
    try:
        return date(int(value[:4]), int(value[4:6]), int(value[6:8]))
    except ValueError:
        return None


def fetch_metadata(url: str, *, timeout: int = 8) -> VideoMeta:
    """Best-effort fetch. Returns empty VideoMeta if extraction fails — the
    caller should treat any missing fields as 'admin-managed only'."""
    if not url:
        return VideoMeta()

    try:
        from yt_dlp import YoutubeDL
    except ImportError:
        logger.warning("yt-dlp not installed; cannot auto-fetch YouTube metadata.")
        return VideoMeta()

    opts = {
        'quiet': True,
        'no_warnings': True,
        'skip_download': True,
        'extract_flat': False,
        'socket_timeout': timeout,
        # YouTube's web extractor often demands a sign-in challenge for
        # server-side IPs; the iOS/Android player clients bypass it.
        'extractor_args': {'youtube': {'player_client': ['ios', 'android', 'web']}},
    }

    try:
        with YoutubeDL(opts) as ydl:
            info = ydl.extract_info(url, download=False)
    except Exception as exc:  # noqa: BLE001 — yt-dlp throws many subtypes
        logger.warning("YouTube metadata fetch failed for %s: %s", url, exc)
        return VideoMeta()

    if not info:
        return VideoMeta()

    return VideoMeta(
        title=(info.get('title') or '').strip(),
        duration=_format_duration(info.get('duration')),
        views=_format_views(info.get('view_count')),
        upload_date=_parse_upload_date(info.get('upload_date')),
        thumbnail_url=info.get('thumbnail') or '',
    )
