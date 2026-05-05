# Django Backend Plan — O'zbekiston Davlat Filarmoniyasi

Planning document for replacing the `src/data/*.js` seed layer with a Django REST API + Django admin backend.

---

## 1. Stack

- **Python 3.12**, **Django 5.1**, **Django REST Framework 3.15**
- **PostgreSQL** (arrays, JSONB for flexible legal-document nesting)
- **Pillow** for image handling; **django-storages + S3** (or local `MEDIA_ROOT`) for uploads
- **django-filter** for list endpoint filtering, **drf-spectacular** for OpenAPI/Swagger
- **django-cors-headers** to allow Next.js dev + prod origins
- **django-modeltranslation** or a `TranslatedField` pattern — seed is Uzbek-only today, but the header already has a language switcher; add locale fields from day one
- **django-import-export** for CSV round-trips (Excel workflow requested for open-data)
- **django-admin-interface** or vanilla admin — optional polish
- **uvicorn + gunicorn** behind nginx in prod

## 2. Project layout

```
backend/
├── manage.py
├── config/                 # settings, urls, wsgi, asgi
├── apps/
│   ├── core/               # shared base models, pagination, mixins
│   ├── site_meta/          # hero slider, footer, navigation, contact, partners
│   ├── about/              # about page content + leadership
│   ├── staff/              # management, central-apparatus, regional-divisions
│   ├── news/               # news + rich body blocks
│   ├── teams/              # creative teams + rich body blocks
│   ├── concerts/           # afisha events (concerts) + categories/venues/conductors
│   ├── events/             # homepage "Konsert va teleshoular" feed (likely retired — see §4)
│   ├── legal_docs/         # statute + youth-politics + future charters (shared model)
│   ├── documents/          # me'yoriy hujjatlar
│   ├── open_data/          # ochiq ma'lumotlar
│   ├── videos/             # youtube-backed videos
│   ├── international/      # memorandums, joint concerts, competitions
│   └── geo/                # Country (flagCode), Region
└── media/                  # uploads (dev)
```

**Why 14 apps**: each matches a URL section on the frontend, keeps Django admin navigation ergonomic, and lets migrations stay small.

## 3. Core conventions (`apps.core`)

- `TimeStampedModel` — `created_at`, `updated_at`
- `SlugModel` — `slug = models.SlugField(unique=True)` with auto-slug via `prepopulated_fields`
- `PublishableModel` — `is_published: bool`, `published_at: datetime` + `PublishedManager`
- `TranslatedField` — wrapper that stores `{uz, ru, en}` JSON, serializer picks via `Accept-Language`
- `BaseAPIView` — standard permission (read-only public, staff for writes), pagination class with `?page=&page_size=`
- Global filter: `?search=` across title fields using PostgreSQL trigram indexes

## 4. Models by app (key fields only)

### `geo`

- **Country**: `code` (alpha-2, PK), `name_uz`, `name_ru`, `name_en`, `flag_code` (= code; kept as a column because the frontend already stores it)
- **Region**: `slug`, `name`, `ordering` — used by `staff.RegionalDivision` and optionally by future regional content

### `site_meta`

- **HeroSlide**: `image`, `subtext`, `title`, `ordering`, `is_active`
- **NavItem**: `label`, `href`, `parent` (self-FK for `children`), `ordering`, `is_active`
- **Footer** (singleton via `django-solo`): `brand`, `copyright`
- **FooterLink**: FK → `Footer`, `label`, `href`, `ordering`
- **ContactInfo** (singleton): `address_line1`, `address_line2`, `map_embed_url`, `map_link`, `latitude`, `longitude`
- **ContactPhone**: FK → `ContactInfo`, `label`, `value`, `href`, `ordering`
- **ContactEmail**: FK → `ContactInfo`, `label`, `value`, `href`, `ordering`
- **BusinessHours**: FK → `ContactInfo`, `days`, `time`, `ordering`
- **SocialLink**: generic (FK via `GenericForeignKey`) — used by ContactInfo, Staff, etc.
- **ContactSubject**: `value`, `ordering` — dropdown options on the contact form
- **Language**: `code`, `label`, `ordering`, `is_active`
- **Partner**: `name`, `logo`, `url`, `ordering`

### `about`

- **AboutPage** (singleton): `hero_eyebrow`, `hero_title`, `hero_subtitle`, `hero_image`, `intro_title`, `intro_paragraphs` (`ArrayField[Text]`), `mission_title`, `mission_text`, `cta_title`, `cta_description`, `cta_primary_label`, `cta_primary_href`, `cta_secondary_label`, `cta_secondary_href`
- **AboutStat**: FK → AboutPage, `value`, `label`, `ordering`
- **AboutMilestone**: FK → AboutPage, `year`, `title`, `description`, `ordering`
- **AboutLeader**: FK → AboutPage, `name`, `role`, `image`, `ordering`

### `staff` (unifies management / central-apparatus / regional-divisions)

- **StaffMember**: `slug`, `fullname`, `position`, `department`, `schedule`, `phone`, `email`, `address`, `description` (Text/Markdown), `image`, `category` (choices: `management` / `central` / `regional`), `region` FK nullable (only for regional), `ordering`
- **StaffSocialLink**: FK → StaffMember, `platform`, `href`, `ordering`

One model, three list endpoints filtered by `category`. Admin gets three proxy models for cleaner nav.

### `news`

- **Author**: `name`, `role`
- **NewsArticle**: `slug`, `title`, `excerpt`, `cover_image`, `author` FK, `published_at` (date), `is_published`
- **NewsBlock**: FK → NewsArticle, `ordering`, `type` (`paragraph` / `image` / `quote` / `gallery`), plus columns for each case — cleanest to keep a flat polymorphic-style table:
  - `text` (paragraph, quote)
  - `image`, `alt`, `caption` (image)
  - `cite` (quote)
- **NewsGalleryImage**: FK → NewsBlock (when type=gallery), `image`, `alt`, `caption`, `ordering`

### `teams`

Mirrors `news` structurally (same block shape) but with a team-specific header.

- **Team**: `slug`, `name`, `short_name`, `genre`, `founded` (year-ish string or `PositiveIntegerField`), `directed_by`, `members_count`, `home_stage`, `cover_image`, `excerpt`, `ordering`
- **TeamBlock**: FK → Team, same polymorphic shape as NewsBlock
- **TeamGalleryImage**: FK → TeamBlock

> If you want zero duplication, extract a `ContentBlock` base class in `apps.core` with `GenericForeignKey` — **I'd skip this for now**; the two tables are cheap and keep admin screens simple.

### `concerts` (the "afisha" events)

- **ConcertCategory**: `value` (symphony/chamber/opera/festival), `label`, `ordering`
- **Venue**: `name`, `ordering`
- **Conductor**: `name`, `bio` optional, `image` optional
- **Concert**: `slug`, `title`, `subtitle`, `excerpt`, `cover_image`, `day` (int), `month` (str), `month_short`, `year` (int), `starts_at` (datetime; single source of truth), `venue` FK, `category` FK, `conductor` FK, `price_label` (free-form), `duration_label`, `is_featured` (for homepage carousel), `about` (`ArrayField[Text]` — the simple paragraph list)
- **ConcertAttachment**: optional — `label`, `file`, `ordering`

### `events` (the homepage card strip — different shape from afisha)

> After review, **recommend collapsing into `concerts`**: the home `EventList` now already maps over `afishaEvents`. Retire `apps.events` and expose the homepage feed as `GET /api/concerts/?featured=true&limit=5`.

### `legal_docs` (statute + youth-politics + future)

- **LegalDocument**: `slug`, `eyebrow`, `title`, `subtitle`, `approved_by`, `published_date`, `document_number`
- **Chapter**: FK → LegalDocument, `number`, `title`, `ordering`
- **Article**: FK → Chapter, `number`, `intro` nullable, `paragraphs` (`ArrayField[Text]`), `ordering`
- **Attachment**: FK → LegalDocument, `label`, `href`, `file` optional, `size`, `ordering`

### `documents`

- **DocumentType**: `label` (Qonun / Prezident qarori / VM qarori / Nizom / ...)
- **Document**: `title`, `type` FK, `date`, `document_number`, `file` (FileField), `size` (auto-computed), `format` (auto-computed from extension), `is_public`, `ordering`

### `open_data`

Same schema as `documents`, but kept as a separate model (different admin audience, permissions, and listing page). Adds `dataset_url` optional (CSV/JSON endpoint link).

### `videos`

- **VideoCategory**: `value`, `label`, `ordering`
- **Video**: `youtube_id`, `title`, `subtitle`, `category` FK, `duration`, `view_count` (int, scraped or manual), `published_at`, `is_featured`, `ordering`

### `international`

- **Memorandum**: `title`, `partner`, `country` FK (→ geo.Country), `signed_at`, `valid_until`, `summary`, `document_number`, `document_file` FileField
- **InternationalConcert**: `title`, `partner`, `country` FK, `date`, `venue`, `summary`, `image`
- **Competition**: `name`, `year`, `city`, `country` FK, `category`, `ordering`
- **CompetitionLaureate**: FK → Competition, `name`, `award`, `ordering`

## 5. DRF layer

### Serializers

- One `ReadSerializer` + one `WriteSerializer` per model where admins edit (write is admin-only)
- Nested read (e.g. `Concert` embeds venue + conductor as flat fields), flat write (IDs only)
- Translated fields: serializer method field that picks locale from `request.LANGUAGE_CODE`

### ViewSets

- `ReadOnlyModelViewSet` for public endpoints (news, concerts, teams, videos, legal docs, etc.)
- `ModelViewSet` for admin-facing writes behind `IsAdminUser`
- Common filters: `?search=`, `?ordering=`, `?page=`, `?category=`, `?year=` (where applicable)
- Detail endpoints accept `slug` (not `pk`) via `lookup_field = 'slug'`

### URL skeleton

```
/api/v1/
  hero-slides/
  navigation/
  footer/
  contact/
  partners/
  about/
  staff/?category=management|central|regional
  news/                                   news/<slug>/
  teams/                                  teams/<slug>/
  concerts/                               concerts/<slug>/
  concerts/?featured=true&limit=5         # home grid
  legal-docs/<slug>/                      # statute, youth-politics
  documents/
  open-data/
  videos/
  memorandums/
  international-concerts/
  competitions/
  countries/                              # read-only
  regions/                                # read-only
```

### Schema / docs

- drf-spectacular generates `/api/schema/` + Swagger UI at `/api/docs/`
- Response caching: `@method_decorator(cache_page(300))` on singletons (home hero, about, footer) — invalidate via `post_save` signal

## 6. Admin layer

- Custom `AdminSite` with branded login
- **Grouping** by app verbose_name: "Sayt tartibi" (site_meta), "Biz haqimizda" (about), "Xodimlar" (staff), "Yangiliklar" (news), "Jamoalar" (teams), "Konsertlar" (concerts), "Hujjatlar" (legal_docs + documents + open_data), "Videolar" (videos), "Xalqaro aloqalar" (international)
- `list_display` tuned for each model (slug, title, published status, preview link)
- **Rich content blocks** (news/teams): `InlineModelAdmin` on `NewsBlock` / `TeamBlock` with a `type` select that toggles relevant fields (use django-admin-sortable2 for drag-reorder)
- **CKEditor/Markdown** field for long text where useful (article `description`, news block `text`)
- Staff proxies: `ManagementStaffAdmin(proxy=True)` etc., each with `get_queryset` filter so admins see only their category
- Singletons via `django-solo` for Footer / ContactInfo / AboutPage so there's exactly one row, always editable
- `import-export` actions on Document, OpenDataItem, Competition for bulk CSV uploads

## 7. Auth & permissions

- Custom `User` (email login) — simpler than Django default
- Three user types: `SUPERUSER`, `EDITOR` (full CMS), `CONTENT_MANAGER` (limited to their section)
- JWT via `djangorestframework-simplejwt` — lives on `/api/auth/token/` and `/api/auth/token/refresh/`
- Admin UI stays on session auth
- Contact form: `POST /api/contact/messages/` — no auth, rate-limited (`django-ratelimit`), writes to an `InboundMessage` model + sends email via Django email backend

## 8. Media handling

- All `ImageField` → S3 bucket in prod (public-read) with versioned keys; local `MEDIA_ROOT` in dev
- On save: auto-generate 400/800/1600 width variants with `easy-thumbnails` or `django-imagekit`
- Serializer exposes `{original, thumb_400, thumb_800}` URLs
- **Flag icons stay frontend-side** — backend only stores the ISO code (`geo.Country.code`), the Next.js client renders via `flag-icons` CSS. No asset duplication.

## 9. Frontend integration strategy

- Keep the current seed files as a fallback adapter: `src/lib/api.js` exposes `getNews()` etc.; flip one function at a time to hit the API
- Pages that are already SSG-friendly (news, teams, concerts, legal docs) stay static — move them to **ISR** (`export const revalidate = 600`) once the API is live
- Contact form `POST` goes straight to the Django endpoint from the client
- Add `NEXT_PUBLIC_API_BASE` env var

## 10. Implementation phases

| Phase | Scope | Deliverable |
|-------|-------|-------------|
| **P0** | Project scaffold, core, auth, admin theming, drf + swagger, CORS, S3 | Empty but deployable backend |
| **P1** | `site_meta` + `about` + `partners` — mostly singletons | Home + About page read from API |
| **P2** | `news` + `teams` with polymorphic blocks and admin inlines | Rich-content editing works end-to-end |
| **P3** | `concerts` + retire `apps.events` in favor of `featured=true` filter | Afisha & home card strip live |
| **P4** | `staff` with the three category proxies | Management / Central / Regional pages |
| **P5** | `legal_docs` (statute, youth-politics) + `documents` + `open_data` | Document-heavy sections + search |
| **P6** | `videos` + `international` (memorandums, joint concerts, competitions) | Remaining pages + country normalization |
| **P7** | i18n — switch all content fields to `TranslatedField`, wire language switcher | Multi-language |
| **P8** | Contact inbound messages, analytics, cache warming | Ops readiness |

## 11. Open decisions before coding

1. **Stick with one `StaffMember` + `category` field, or three separate tables?** Recommend one + proxies for admin — the frontend already reads identical fields for all three.
2. **Retire `apps.events` (home strip)?** Yes — it's already shimmed to afisha data.
3. **`TranslatedField` JSONB vs django-modeltranslation's per-column approach?** JSONB is simpler to add later and plays nicely with DRF. Recommend JSONB.
4. **`NewsBlock` / `TeamBlock`: one shared table vs two?** Two. Simpler admin, simpler migrations, costs nothing.
5. **Public Swagger** or keep schema auth-gated?

---

## Appendix — Seed-data inventory (source of truth)

One line per file under `src/data/`, listing exported names and the item shape that informed each Django model.

### `about.js`
- `aboutContent = { hero, intro, stats[], milestones[], mission, leadership{members[]}, cta{primary, secondary} }`
- Drives `about.AboutPage` singleton + `AboutStat` / `AboutMilestone` / `AboutLeader`

### `afisha.js`
- `afishaMeta`, `afishaFilters[]`, `afishaEvents[]`
- Each event: `{id, slug, day, month, monthShort, year, time, venue, category, categoryLabel, title, subtitle, excerpt, image, conductor, price, duration, about[]}` — `about` is plain string paragraphs
- Drives `concerts.Concert` + `ConcertCategory` + `Venue` + `Conductor`

### `centralApparatus.js`
- `centralApparatusContent = { meta, members[] }`
- Member: `{slug, fullname, position, department, schedule, contact{phone, email}, address, social[{platform, href}], description, img}`
- Drives `staff.StaffMember` (category=`central`)

### `contact.js`
- `contactMeta`, `contactInfo`, `contactSubjects[]`
- `contactInfo`: `{address{line1, line2}, phones[], emails[], hours[], social[], mapEmbed, mapLink, coordinates{lat,lng}}`
- Drives `site_meta.ContactInfo` + child tables

### `documents.js`
- `documentsMeta`, `documents[]`
- Item: `{id, title, type, date, size, format, documentNumber, url}`
- Drives `documents.Document` + `DocumentType`

### `events.js`
- `events[]`, `eventFilters[]`
- Item: `{id, dateValue, month, label, title, desc, img?, isTextHeavy?}`
- **Superseded** — home `EventList` now reads from `afishaEvents`. Retire.

### `footer.js`
- `footerContent = {brand, links[], copyright}`
- Drives `site_meta.Footer` + `FooterLink`

### `hero.js`
- `heroSlides[]`
- Item: `{id, image, subtext, title}`
- Drives `site_meta.HeroSlide`

### `international.js`
- `memorandumsMeta`, `memorandums[]` — `{id, title, partner, country, flagCode, signedAt, validUntil, summary, documentNumber, docUrl}`
- `intlConcertsMeta`, `intlConcerts[]` — `{id, title, partner, country, flagCode, date, venue, summary, image}`
- `competitionsMeta`, `competitions[]` — `{id, name, year, city, country, flagCode, category, laureates[{name, award}]}`
- Drives `international.*` + `geo.Country`

### `management.js`
- Same shape as `centralApparatus.js`
- Drives `staff.StaffMember` (category=`management`)

### `navigation.js`
- `navItems[]` (with optional `children[]`), `languages[]`
- Drives `site_meta.NavItem` (self-FK) + `site_meta.Language`

### `news.js`
- `newsMeta`, `newsArticles[]`
- Item: `{id, slug, date, publishedAt, title, excerpt, image, author{name, role}, body[]}`
- `body[]` discriminated union: `{type: 'paragraph'|'image'|'quote'|'gallery', ...}` — identical shape to `teams.js`
- Drives `news.NewsArticle` + `NewsBlock` + `NewsGalleryImage` + `Author`

### `openData.js`
- `openDataMeta`, `openDataItems[]`
- Same item shape as `documents.js`
- Drives `open_data.OpenDataItem` (separate table from documents)

### `partners.js`
- `partners[]` — `{name, img}`
- Drives `site_meta.Partner`

### `regionalDivisions.js`
- Same shape as `centralApparatus.js` + extra `region` field
- Drives `staff.StaffMember` (category=`regional`) + `geo.Region`

### `statute.js`
- `statuteContent = { meta, chapters[], attachments[] }`
- Chapter: `{id, number, title, articles[{number, intro?, paragraphs[]}]}`
- Drives `legal_docs.LegalDocument` + `Chapter` + `Article` + `Attachment`

### `teams.js`
- `teamsMeta`, `teams[]`
- Item: `{id, slug, name, shortName, genre, founded, directedBy, membersCount, homeStage, image, excerpt, body[]}`
- `body[]` same discriminated union as `news.js`
- Drives `teams.Team` + `TeamBlock` + `TeamGalleryImage`

### `videos.js`
- `videosMeta`, `videoCategories[]`, `videos[]`
- Video: `{id, youtubeId, title, subtitle, category, categoryLabel, duration, views, date, featured?}`
- Drives `videos.Video` + `VideoCategory`

### `youthPolitics.js`
- `youthPoliticsContent = { meta, chapters[], attachments[] }` — **identical shape to `statute.js`**
- Drives `legal_docs.LegalDocument` (second instance, no schema changes needed)

---

### Cross-file references

- `navigation.js` routes to every section — read as the URL inventory
- `footer.js` → `/privacy`, `/terms`, `/press`, `/contact`
- `about.js.cta` → `/events`, `/contact`
- `international.js` → shared `flagCode` → normalize into `geo.Country`
- `news.js` + `teams.js` → identical `body[]` shape → two parallel tables (recommended) or one polymorphic `ContentBlock` (skip)
