# syntax=docker/dockerfile:1.7

FROM python:3.12-slim AS base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    UV_LINK_MODE=copy \
    UV_SYSTEM_PYTHON=1

# System libs for Pillow (jpeg/zlib), lxml (libxml2/libxslt), yt-dlp (ffmpeg optional)
RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        libjpeg-dev \
        zlib1g-dev \
        libxml2-dev \
        libxslt-dev \
    && rm -rf /var/lib/apt/lists/*

# uv (fast Python package manager) — same toolchain used in dev
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Install Python deps — pyproject.toml is the source of truth
COPY pyproject.toml ./
RUN uv pip install --system -r pyproject.toml gunicorn whitenoise

# App code
COPY . .

# Pre-collect static so Jazzmin/CKEditor assets are available even without DEBUG
RUN python manage.py collectstatic --noinput || true

EXPOSE 8000

# Default command: migrate then serve. Override in docker-compose for dev runserver.
CMD ["sh", "-c", "python manage.py migrate --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3 --access-logfile -"]
