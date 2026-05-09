# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

**O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi** — Next.js 16 (App Router) website for the Uzbekistan State Philharmonic, backed by a Django + DRF API. Design system: **"Aetheric Resonance"** — futuristic-formal, light surfaces, dark hero.

The repo is a **monorepo of two apps**:

- **Frontend** at the repo root — Next.js public site (port 3000)
- **Backend** at [backend/](backend/) — Django admin + REST API (port 8000)

## Stack

### Frontend
- **Next.js 16** (App Router) with `src/` directory — see `AGENTS.md`: this version has breaking changes from older Next.js, consult `node_modules/next/dist/docs/` before writing code
- **React 19**, JavaScript (JSX), no TypeScript
- **Styling**: CSS Modules (`.module.css`) only — **never use Tailwind classes in components** despite `tailwindcss` being a dev dependency
- **Swiper.js** for sliders (requires `'use client'`)
- **Google Fonts** (Space Grotesk, Manrope) + Material Symbols Outlined loaded via `<link>` tags in [src/app/layout.js](src/app/layout.js)

### Backend
- **Python 3.12** managed by [uv](https://github.com/astral-sh/uv) — `uv venv`, `uv pip install -r pyproject.toml`
- **Django 5.1** + **DRF 3.15** + **django-jazzmin** (admin theme) + **django-ckeditor-5** (richtext) + **django-cors-headers** + **drf-spectacular** (Swagger) + **django-mptt** (nav tree) + **yt-dlp** (YouTube metadata)
- **SQLite** dev DB at `backend/db.sqlite3`
- Apps live under `backend/apps/<name>/` (dotted paths e.g. `apps.news`, `apps.events`); see `INSTALLED_APPS` in [backend/config/settings.py](backend/config/settings.py)

## Commands

### Frontend (run from repo root)

```bash
npm run dev      # Dev server (default http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (next/core-web-vitals)
```

### Backend (run from `backend/`)

```bash
.venv/Scripts/python.exe manage.py runserver 8000          # Dev API at http://localhost:8000
.venv/Scripts/python.exe manage.py makemigrations          # After model changes
.venv/Scripts/python.exe manage.py migrate                 # Apply migrations
.venv/Scripts/python.exe manage.py seed_from_frontend dump.json  # Re-ingest seed data
node scripts/dump_frontend_data.mjs seed_data dump.json    # Re-build dump.json from seed_data/
```

Admin: http://localhost:8000/admin/ — `admin / admin12345`. Swagger UI: http://localhost:8000/api/schema/swagger/.

No test runner is configured for either app.

### Docker (both apps together)

```bash
docker compose up --build              # Build + run frontend (3000) + backend (8000)
docker compose exec backend python manage.py createsuperuser
docker compose exec backend python manage.py seed_from_frontend dump.json
docker compose down                    # Volumes (backend-data, backend-media) persist
docker compose down -v                 # Wipe DB + uploads
```

Compose-specific wiring (non-obvious):
- The frontend image is built from a Next.js **standalone** output ([next.config.mjs](next.config.mjs) sets `output: 'standalone'`). Editing the standalone runner stage in [Dockerfile](Dockerfile) requires `.next/standalone` to exist after `npm run build`.
- The Django SQLite path is env-driven: `SQLITE_PATH` overrides `BASE_DIR / 'db.sqlite3'`. In compose it points at `/app/data/db.sqlite3` mounted on the `backend-data` named volume so the DB survives rebuilds. The default (empty env) still resolves to the in-tree `backend/db.sqlite3` for non-Docker dev — do not break this.
- `NEXT_PUBLIC_API_BASE` defaults to `http://localhost:8000/api/v1` — the **browser** hits the host port, not the docker network alias `backend:8000`, because Server Components and the browser share the same env value. If you split SSR vs. client fetches, introduce a separate server-only `API_BASE_INTERNAL`.
- Backend image runs `gunicorn` with `DEBUG=True` so `static()` URL patterns serve user-uploaded media. For a real prod deploy, swap to `DEBUG=False` and front it with nginx (or add WhiteNoise middleware — already installed in the image).

## Frontend ↔ Backend wiring (load-bearing)

The frontend has **zero** static data imports. Every page is an `async` Server Component that fetches from the backend via [src/lib/api.js](src/lib/api.js), with `next: { revalidate: 60 }` ISR.

- Each page file imports its data fetchers from `@/lib/api` and passes the result as props to (mostly client) child components.
- `Header` and `Footer` are client components for stateful UI (mobile menu, language picker, scroll-detect sticky bar). They're wrapped by server-side **Shell** components ([HeaderShell.jsx](src/components/Header/HeaderShell.jsx), [FooterShell.jsx](src/components/Footer/FooterShell.jsx)) that fetch nav + footer data and pass them in. **Pages always import `Header`/`Footer` from the `Shell` files**, never from the bare client component.
- Image hosts allowed in `next.config.mjs`: `localhost:8000`, `lh3.googleusercontent.com`, `loremflickr.com`, `admin.filarmoniya.uz`.
- Backend CORS is open to `http://localhost:3000` and `http://127.0.0.1:3000`.

### Original seed data lives in [backend/seed_data/](backend/seed_data/)

These are the original `*.js` data files that used to live under `src/data/` before the API was wired in. They remain in-tree as the source of truth for the initial DB seed and as a reference for content shape — **do not import them from the frontend**, ever. To re-seed:

```bash
cd backend
node scripts/dump_frontend_data.mjs seed_data dump.json
.venv/Scripts/python.exe manage.py seed_from_frontend dump.json
```

## Design System

**Always consult [ref/DESIGN.md](ref/DESIGN.md) before visual changes.** Hard rules:

- **`border-radius: 0` on everything** — no rounded corners, ever
- **No 1px solid borders** for sectioning — use tonal surface shifts (e.g. `surface-container-lowest` card on `surface-container-low` background)
- All colors come from CSS variables in [src/app/globals.css](src/app/globals.css) (`--primary`, `--secondary`, `--surface-*`, `--on-surface-*`) — **never hardcode hex values**
- Typography: Space Grotesk (display/headlines), Manrope (body/labels)
- Sticky nav uses `backdrop-filter: blur(20px)` glassmorphism
- Purple `--secondary` brush-stroke blurs for artistic overlays

[ref/code.html](ref/code.html) is a Tailwind-based HTML prototype used as a visual reference — **do not port its Tailwind classes**, translate the design into CSS Modules.

## Frontend Architecture

Home page ([src/app/page.js](src/app/page.js)) is a server component that fetches afisha events, news, partners, management & central apparatus, then composes: `HeaderShell` → `HeroSlider` → `NewsSection` → `EventList` → `TeamList` → `Partners` → `FooterShell`. Each component lives in its own folder under [src/components/](src/components/) with a co-located `.module.css`.

### Header — two-element pattern (non-obvious)

[Header.jsx](src/components/Header/Header.jsx) is a **client** component (must be — has scroll detection, language menu, full-screen overlay). It accepts `navItems` and `languages` as props from [HeaderShell.jsx](src/components/Header/HeaderShell.jsx) (server component that calls `getNavigation()`).

It renders **two separate DOM elements** sharing one `<HeaderBar>` sub-component:

1. `<header>` — `position: absolute`, transparent, sits on top of the hero and scrolls away with content
2. `<div className={stickyHeader}>` — `position: fixed`, initially off-screen at `translateY(-100%)`; slides down when `scrollY > 200`, slides back up on return to top

When the full-screen menu overlay opens, all header elements except the close button are hidden via a `.hiddenWhenOpen` class.

Navigation uses **progressive disclosure**: inline nav items appear/disappear at 768 / 1024 / 1280 / 1440px breakpoints. The hamburger is always visible and opens a full-screen dark overlay; some nav items declare a `children[]` array that expands/collapses inside that overlay.

### HeroSlider

Swiper with `EffectFade` + `Autoplay`. Background images animate `scale(1.15) → scale(1)` on `.swiper-slide-active`. Must be `'use client'`. Receives `events` prop from the home server component.

## Backend Architecture

### App layout

```
backend/apps/
├── common/         # shared utilities (richtext.py, chapter_parser.py, youtube.py, youtube_meta.py, models.py)
├── core/           # SiteSettings (singleton), HeroSlide, Partner, NavigationItem (mptt), ContactInfo (singleton + inlines), ContactSubject, ContactMessage; also management commands
├── news/           # NewsArticle (no author, single richtext field)
├── events/         # EventCategory + Event (unified afisha + home page events; show_in_afisha toggle)
├── teams/          # Team (richtext body)
├── people/         # Department, Person (group=management|central_apparatus), PersonSocial
├── pages/          # AboutPage (singleton + AboutStat/AboutMilestone inlines), ChapteredDocument (Statute, YouthPolitics — single richtext field; chapters & articles auto-parsed), DocumentAttachment
├── documents/      # Document, OpenDataItem, PressRelease (file uploads + external URLs)
├── media_app/      # VideoCategory, Video (paste YouTube URL → metadata auto-fetched via yt-dlp)
└── international/  # Memorandum, IntlConcert, Competition + CompetitionLaureate
```

All apps use dotted labels (`apps.news`, `apps.events`, …) — see each app's `apps.py`. Common abstract bases live in [apps/common/models.py](backend/apps/common/models.py): `TimestampedModel`, `PublishableModel` (adds `is_published` / `order`).

### Richtext → JSON pipeline (load-bearing pattern)

Several models accept a single CKEditor 5 HTML field; on `save()` an HTML parser produces structured JSON the frontend already speaks. **The HTML is the source of truth**; the JSON is a derived, read-only column.

- **News, Teams, Events** ([apps/common/richtext.py](backend/apps/common/richtext.py)): `body_html` → `body_blocks: [{type:'paragraph'|'heading'|'image'|'gallery'|'quote'|'list', ...}]`. Adjacent `<figure>` elements auto-collect into a gallery; `<blockquote>` with optional `<cite>` becomes a quote. The frontend's `renderBlock` switch in [NewsArticle.jsx](src/components/NewsArticle/NewsArticle.jsx) renders this directly.
- **ChapteredDocument** ([apps/common/chapter_parser.py](backend/apps/common/chapter_parser.py)): `body_html` → `body_chapters: [{id, number, title, articles: [{number, intro, paragraphs}]}]`. Convention: `<h2>` = chapter (heading text format `"<NUMBER> — <TITLE>"`), `<h3>` = article (heading text = article number, e.g. "1-modda"), and a leading `<p>` ending in `:` followed by `<ul>/<ol>` becomes the article's `intro` + `paragraphs` list.

### YouTube metadata auto-fetch

[Video.save()](backend/apps/media_app/models.py) extracts the 11-char YouTube ID from any URL form (`watch?v=`, `youtu.be`, `embed`, `shorts`, `live`, bare ID) via [apps/common/youtube.py](backend/apps/common/youtube.py). It then fetches title, duration, view count, upload date, and thumbnail via [apps/common/youtube_meta.py](backend/apps/common/youtube_meta.py) (yt-dlp with `player_client=['ios','android','web']` to bypass YouTube's anti-bot challenge). **Manually-typed values are never overwritten** automatically — the bulk admin action "YouTubedan metadata-ni yangilash" force-refreshes selected videos.

### Singletons

`SiteSettings`, `ContactInfo`, `AboutPage` are 1-row models. They override `save()` to pin `pk=1`, expose `load()` classmethod, and the admin disables `add` / `delete` permissions.

### Important gotcha: `Manager.update_or_create(defaults=...)` + `update_fields`

When the row already exists, Django's `update_or_create` calls `obj.save(using=..., update_fields=defaults_keys)`. Custom `save()` writes to fields not in `defaults` (e.g. derived JSON like `body_blocks`, `body_chapters`) **are silently dropped**. For models with derived fields, prefer:

```python
obj, _ = Model.objects.get_or_create(slug=slug, defaults={...required NOT NULL fields...})
obj.field = ...
obj.save()  # full save, all fields written, save() hooks fire
```

This pattern is used throughout [seed_from_frontend.py](backend/apps/core/management/commands/seed_from_frontend.py) for chaptered docs, news, events, teams, people.

### Admin (Jazzmin) gotcha: HTML in fieldset descriptions

Django escapes the `'description'` string of an admin fieldset by default. To render bold / `<code>` / `<br/>` in the help blurb, wrap with `django.utils.safestring.mark_safe`. Currently used in news, pages (chaptered docs), and videos admins.

## Conventions

### Frontend
- `'use client'` on any component with state, effects, or browser APIs
- Material Symbols icons: `<span className="material-symbols-outlined">icon_name</span>`
- Import alias: `@/` → `src/` (see [jsconfig.json](jsconfig.json))
- Static images live in [public/images/](public/images/); user-uploaded media is served by Django at `http://localhost:8000/media/...`
- HTML `lang="uz"` — content is Uzbek; preserve Latin-script Uzbek strings verbatim
- Pages always import `Header`/`Footer` from the **Shell** variants (server components), never the bare client components

### Backend
- All apps inherit `TimestampedModel` (`created_at`, `updated_at`) and most inherit `PublishableModel` (`is_published`, `order`). The `is_published` field has `verbose_name="Aktiv"` in admin.
- Verbose names + help texts are in Uzbek (Latin script). Preserve apostrophes and accents verbatim.
- Image fields support both file upload (`image = ImageField`) and external URL (`image_url = URLField`); models expose a `resolved_image` property that prefers the uploaded file. Serializers wrap the result with [absolute_url](backend/apps/common/serializers.py) so the API always returns a full URL the Next.js client can fetch.
- Admins use `prepopulated_fields = {'slug': ('title',)}` for slug models, and `readonly_fields` for derived JSON / preview displays.
