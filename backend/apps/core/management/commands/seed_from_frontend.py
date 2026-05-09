"""Seed the DB from a JSON dump of the Next.js frontend's src/data/*.js.

Usage:
    node scripts/dump_frontend_data.mjs ../src/data dump.json
    python manage.py seed_from_frontend dump.json

The command is idempotent: running twice updates existing rows by their
natural key (slug, code, name+date, ...).
"""
from __future__ import annotations

import json
import re
from datetime import date, datetime
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.text import slugify

from apps.core.models import (
    ContactEmail, ContactHours, ContactInfo, ContactPhone, ContactSocial,
    ContactSubject, FooterSocialLink, HeroSlide, NavigationItem, Partner,
    SiteSettings,
)
from apps.documents.models import Document, OpenDataItem, PressRelease
from apps.events.models import Event, EventCategory
from apps.international.models import (
    Competition, CompetitionLaureate, IntlConcert, Memorandum,
)
from apps.media_app.models import Video, VideoCategory
from apps.news.models import NewsArticle
from apps.pages.models import (
    AboutMilestone, AboutPage, AboutStat,
    ChapteredDocument, DocumentAttachment,
)
from apps.people.models import Department, Person, PersonSocial
from apps.teams.models import Team


UZ_MONTH_TO_NUM = {
    'Yanvar': 1, 'Fevral': 2, 'Mart': 3, 'Aprel': 4, 'May': 5, 'Iyun': 6,
    'Iyul': 7, 'Avgust': 8, 'Sentabr': 9, 'Oktabr': 10, 'Noyabr': 11, 'Dekabr': 12,
}


def parse_date(value):
    if not value:
        return None
    if isinstance(value, date):
        return value
    if isinstance(value, str):
        try:
            return datetime.fromisoformat(value).date()
        except ValueError:
            pass
    return None


def blocks_to_html(blocks: list) -> str:
    """Convert frontend body[] (array of blocks or strings) back to HTML so the
    backend's HTML→blocks parser becomes the source of truth. This means admins
    later edit a single CKEditor field without seeing the JSON shape."""
    parts = []
    for b in blocks or []:
        if isinstance(b, str):
            parts.append(f"<p>{escape(b)}</p>")
            continue
        t = b.get('type')
        if t == 'paragraph':
            parts.append(f"<p>{escape(b.get('text', ''))}</p>")
        elif t == 'heading':
            level = b.get('level', 2)
            parts.append(f"<h{level}>{escape(b.get('text', ''))}</h{level}>")
        elif t == 'image':
            alt = escape(b.get('alt', ''))
            src = escape(b.get('src', ''))
            cap = escape(b.get('caption', ''))
            parts.append(
                f'<figure><img src="{src}" alt="{alt}"/>'
                + (f'<figcaption>{cap}</figcaption>' if cap else '')
                + '</figure>'
            )
        elif t == 'gallery':
            inner = ''.join(
                f'<figure><img src="{escape(i.get("src", ""))}" alt="{escape(i.get("alt", ""))}"/>'
                + (f'<figcaption>{escape(i.get("caption", ""))}</figcaption>' if i.get('caption') else '')
                + '</figure>'
                for i in b.get('images', [])
            )
            parts.append(f'<figure class="gallery">{inner}</figure>')
        elif t == 'quote':
            cite = b.get('cite', '')
            cite_html = f'<cite>{escape(cite)}</cite>' if cite else ''
            parts.append(f'<blockquote><p>{escape(b.get("text", ""))}</p>{cite_html}</blockquote>')
        elif t == 'list':
            tag = 'ol' if b.get('ordered') else 'ul'
            items = ''.join(f'<li>{escape(i)}</li>' for i in b.get('items', []))
            parts.append(f'<{tag}>{items}</{tag}>')
    return '\n'.join(parts)


def escape(text: str) -> str:
    return (
        (text or '')
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
    )


class Command(BaseCommand):
    help = "Seed DB from a JSON dump of the frontend's src/data/*.js modules."

    def add_arguments(self, parser):
        parser.add_argument('dump_path', type=str)

    def handle(self, *args, **options):
        path = Path(options['dump_path'])
        data = json.loads(path.read_text(encoding='utf-8'))

        with transaction.atomic():
            self.seed_core(data)
            self.seed_news(data)
            self.seed_events(data)
            self.seed_teams(data)
            self.seed_people(data)
            self.seed_about(data)
            self.seed_chaptered_docs(data)
            self.seed_documents(data)
            self.seed_videos(data)
            self.seed_international(data)
            self.seed_navigation(data)

        self.stdout.write(self.style.SUCCESS('Seeded successfully.'))

    # ---------------- core ----------------
    def seed_core(self, data):
        footer = data.get('footer', {}).get('footerContent', {})
        ss = SiteSettings.load()
        ss.brand_full = footer.get('brand', ss.brand_full)
        ss.footer_address = footer.get('address', ss.footer_address)
        ss.footer_phone = footer.get('phone', ss.footer_phone)
        ss.footer_email = footer.get('email', ss.footer_email)
        ss.copyright_line = footer.get('copyright', ss.copyright_line)
        ss.save()
        ss.socials.all().delete()
        for i, s in enumerate(footer.get('socials', [])):
            FooterSocialLink.objects.create(
                site=ss,
                label=s.get('label', ''),
                icon=s.get('icon', ''),
                href=s.get('href', '#'),
                order=i,
            )

        # Partners
        Partner.objects.all().delete()
        for i, p in enumerate(data.get('partners', {}).get('partners', [])):
            Partner.objects.create(
                name=p.get('name', f'Partner {i+1}'),
                image_url=p.get('img', ''),
                order=i,
            )

        # Hero
        HeroSlide.objects.all().delete()
        for i, slide in enumerate(data.get('hero', {}).get('heroSlides', [])):
            HeroSlide.objects.create(
                title=slide.get('title', ''),
                subtext=slide.get('subtext', ''),
                image_url=slide.get('image', ''),
                order=i,
            )

        # Contact
        cmeta = data.get('contact', {})
        ci = ContactInfo.load()
        info = cmeta.get('contactInfo', {})
        ci.address_line1 = info.get('address', {}).get('line1', ci.address_line1)
        ci.address_line2 = info.get('address', {}).get('line2', ci.address_line2)
        ci.map_embed_url = info.get('mapEmbed', ci.map_embed_url)
        ci.map_link = info.get('mapLink', ci.map_link)
        coords = info.get('coordinates') or {}
        if coords.get('lat'):
            ci.latitude = coords['lat']
        if coords.get('lng'):
            ci.longitude = coords['lng']
        ci.save()

        ci.phones.all().delete()
        for i, p in enumerate(info.get('phones', [])):
            ContactPhone.objects.create(info=ci, label=p['label'], value=p['value'], order=i)
        ci.emails.all().delete()
        for i, e in enumerate(info.get('emails', [])):
            ContactEmail.objects.create(info=ci, label=e['label'], value=e['value'], order=i)
        ci.hours.all().delete()
        for i, h in enumerate(info.get('hours', [])):
            ContactHours.objects.create(info=ci, days=h['days'], time=h['time'], order=i)
        ci.social.all().delete()
        for i, s in enumerate(info.get('social', [])):
            ContactSocial.objects.create(
                info=ci,
                platform=s.get('platform', ''),
                icon=s.get('icon', ''),
                href=s.get('href', '#'),
                order=i,
            )

        ContactSubject.objects.all().delete()
        for i, name in enumerate(cmeta.get('contactSubjects', [])):
            ContactSubject.objects.create(name=name, order=i)

        self.stdout.write('  • core (footer, hero, partners, contact) seeded')

    # ---------------- news ----------------
    def seed_news(self, data):
        articles = data.get('news', {}).get('newsArticles', [])
        for art in articles:
            published = parse_date(art.get('publishedAt')) or date.today()
            obj, _ = NewsArticle.objects.get_or_create(slug=art['slug'])
            obj.title = art['title']
            obj.excerpt = art.get('excerpt', '')
            obj.image_url = art.get('image', '')
            obj.published_at = published
            obj.display_date = art.get('date', '')
            obj.body_html = blocks_to_html(art.get('body', []))
            obj.save()
        self.stdout.write(f'  • {len(articles)} news articles seeded')

    # ---------------- events (afisha + home merged) ----------------
    def seed_events(self, data):
        afisha = data.get('afisha', {})
        for f in afisha.get('afishaFilters', []):
            if f['value'] == 'all':
                continue
            EventCategory.objects.update_or_create(
                value=f['value'],
                defaults={'label': f['label']},
            )

        events = afisha.get('afishaEvents', [])
        seen_slugs = set()
        for ev in events:
            slug = ev['slug']
            if slug in seen_slugs:
                slug = f"{slug}-{ev.get('id', 0)}"
            seen_slugs.add(slug)
            cat = EventCategory.objects.filter(value=ev.get('category', '')).first()
            month_num = UZ_MONTH_TO_NUM.get(ev.get('month'), 1)
            day_num = int(re.match(r'\d+', str(ev.get('day', '1'))).group(0))
            year_num = int(ev.get('year', date.today().year))
            time_str = ev.get('time', '19:00')
            hh, mm = (int(x) for x in time_str.split(':'))
            starts = datetime(year_num, month_num, day_num, hh, mm)

            about_html = blocks_to_html([
                {'type': 'paragraph', 'text': p} for p in ev.get('about', [])
            ])

            obj, _ = Event.objects.get_or_create(
                slug=slug,
                defaults={
                    'title': ev.get('title', ''),
                    'starts_at': starts,
                    'venue': ev.get('venue', ''),
                    'show_in_afisha': True,
                },
            )
            obj.title = ev.get('title', '')
            obj.subtitle = ev.get('subtitle', '')
            obj.excerpt = ev.get('excerpt', '')
            obj.starts_at = starts
            obj.venue = ev.get('venue', '')
            obj.category = cat
            obj.image_url = ev.get('image', '')
            obj.conductor = ev.get('conductor', '')
            obj.price = ev.get('price', '')
            obj.duration = ev.get('duration', '')
            obj.about_html = about_html
            obj.show_in_afisha = True
            obj.save()
        self.stdout.write(f'  • {len(events)} events seeded')

    # ---------------- teams ----------------
    def seed_teams(self, data):
        teams = data.get('teams', {}).get('teams', [])
        for i, t in enumerate(teams):
            Team.objects.update_or_create(
                slug=t['slug'],
                defaults={
                    'name': t['name'],
                    'short_name': t.get('shortName', ''),
                    'genre': t.get('genre', ''),
                    'founded': t.get('founded', ''),
                    'directed_by': t.get('directedBy', ''),
                    'members_count': t.get('membersCount', ''),
                    'home_stage': t.get('homeStage', ''),
                    'image_url': t.get('image', ''),
                    'excerpt': t.get('excerpt', ''),
                    'body_html': blocks_to_html(t.get('body', [])),
                    'order': i,
                },
            )
        self.stdout.write(f'  • {len(teams)} teams seeded')

    # ---------------- people ----------------
    def seed_people(self, data):
        for group_key, payload_key in (
            ('management', 'managementContent'),
            ('central_apparatus', 'centralApparatusContent'),
        ):
            file_key = 'management' if group_key == 'management' else 'centralApparatus'
            payload = data.get(file_key, {}).get(payload_key, {})
            members = payload.get('members', [])
            for i, m in enumerate(members):
                dept_name = m.get('department') or ''
                dept = None
                if dept_name:
                    dept, _ = Department.objects.get_or_create(name=dept_name)
                contact = m.get('contact') or {}
                description_html = blocks_to_html([
                    {'type': 'paragraph', 'text': m.get('description', '')}
                ])
                person, _ = Person.objects.update_or_create(
                    slug=m['slug'],
                    defaults={
                        'group': group_key,
                        'fullname': m.get('fullname', ''),
                        'position': m.get('position', ''),
                        'department': dept,
                        'schedule': m.get('schedule', ''),
                        'phone': contact.get('phone', ''),
                        'email': contact.get('email', ''),
                        'address': m.get('address', ''),
                        'image_url': m.get('img', ''),
                        'description_html': description_html,
                        'order': i,
                    },
                )
                person.social.all().delete()
                for j, s in enumerate(m.get('social') or []):
                    PersonSocial.objects.create(
                        person=person,
                        platform=s.get('platform', ''),
                        href=s.get('href', '#'),
                        order=j,
                    )
            self.stdout.write(f'  • {len(members)} people ({group_key}) seeded')

    # ---------------- about ----------------
    def seed_about(self, data):
        ab = data.get('about', {}).get('aboutContent', {})
        if not ab:
            return
        page = AboutPage.load()
        hero = ab.get('hero', {})
        page.hero_eyebrow = hero.get('eyebrow', '')
        page.hero_title = hero.get('title', '')
        page.hero_subtitle = hero.get('subtitle', '')
        page.hero_image_url = hero.get('image', '')
        intro = ab.get('intro', {})
        page.intro_title = intro.get('title', '')
        page.intro_body_html = blocks_to_html([
            {'type': 'paragraph', 'text': p} for p in intro.get('paragraphs', [])
        ])
        mission = ab.get('mission', {})
        page.mission_title = mission.get('title', '')
        page.mission_text = mission.get('text', '')
        page.save()

        page.stats.all().delete()
        for i, s in enumerate(ab.get('stats', [])):
            AboutStat.objects.create(page=page, value=s['value'], label=s['label'], order=i)
        page.milestones.all().delete()
        for i, m in enumerate(ab.get('milestones', [])):
            AboutMilestone.objects.create(
                page=page,
                year=m.get('year', ''),
                title=m.get('title', ''),
                description=m.get('desc', ''),
                order=i,
            )
        self.stdout.write('  • about page seeded')

    # ---------------- chaptered docs ----------------
    def seed_chaptered_docs(self, data):
        """Build ONE HTML blob per document (h2=chapter, h3=article).

        On save the model parses the HTML back into the structured chapters/articles
        JSON, so the admin only ever edits a single CKEditor field.
        """
        for kind, key, payload_key in (
            ('statute', 'statute', 'statuteContent'),
            ('youth_politics', 'youthPolitics', 'youthPoliticsContent'),
        ):
            payload = data.get(key, {}).get(payload_key, {})
            if not payload:
                continue
            meta = payload.get('meta', {})

            html_parts: list[str] = []
            for ch in payload.get('chapters', []):
                number = (ch.get('number') or '').strip()
                title = (ch.get('title') or '').strip()
                if number and title:
                    heading = f"{escape(number)} — {escape(title)}"
                else:
                    heading = escape(title or number)
                html_parts.append(f"<h2>{heading}</h2>")

                for art in ch.get('articles', []):
                    art_num = escape(art.get('number', '')).strip()
                    html_parts.append(
                        f"<h3>{art_num}-modda</h3>" if art_num else "<h3></h3>"
                    )
                    intro = (art.get('intro') or '').strip()
                    paragraphs = art.get('paragraphs') or []
                    if intro and paragraphs and intro.endswith(':'):
                        # Intro + list pattern → round-trips back to {intro, paragraphs}
                        html_parts.append(f"<p>{escape(intro)}</p>")
                        items = ''.join(
                            f"<li>{escape(p)}</li>" for p in paragraphs
                        )
                        html_parts.append(f"<ul>{items}</ul>")
                    else:
                        if intro:
                            html_parts.append(f"<p>{escape(intro)}</p>")
                        for p in paragraphs:
                            html_parts.append(f"<p>{escape(p)}</p>")

            # Plain get_or_create + save() — update_or_create would pass
            # update_fields=defaults and skip our save-derived body_chapters.
            doc, _ = ChapteredDocument.objects.get_or_create(kind=kind)
            doc.eyebrow = meta.get('eyebrow', '')
            doc.title = meta.get('title', '')
            doc.subtitle = meta.get('subtitle', '')
            doc.approved_by = meta.get('approvedBy', '')
            doc.published_date = parse_date(meta.get('publishedDate'))
            doc.document_number = meta.get('documentNumber', '')
            doc.body_html = '\n'.join(html_parts)
            doc.save()
            doc.attachments.all().delete()
            for i, att in enumerate(payload.get('attachments', [])):
                DocumentAttachment.objects.create(
                    document=doc,
                    label=att.get('label', ''),
                    href=att.get('href', '#'),
                    size=att.get('size', ''),
                    order=i,
                )
            n_ch = len(doc.body_chapters or [])
            n_art = sum(len(c.get('articles', [])) for c in (doc.body_chapters or []))
            self.stdout.write(
                f'  • {kind}: {n_ch} bob, {n_art} modda parsed from richtext'
            )

    # ---------------- documents / press / open data ----------------
    def seed_documents(self, data):
        for model, file_key, payload_key in (
            (Document, 'documents', 'documents'),
            (OpenDataItem, 'openData', 'openDataItems'),
            (PressRelease, 'pressReleases', 'pressReleases'),
        ):
            items = data.get(file_key, {}).get(payload_key, [])
            model.objects.all().delete()
            for i, d in enumerate(items):
                model.objects.create(
                    title=d.get('title', ''),
                    type=d.get('type', ''),
                    date=parse_date(d.get('date')) or date.today(),
                    document_number=d.get('documentNumber', ''),
                    external_url=d.get('url', '#'),
                    size=d.get('size', ''),
                    format=d.get('format', 'PDF'),
                    order=i,
                )
            self.stdout.write(f'  • {len(items)} {model._meta.verbose_name_plural} seeded')

    # ---------------- videos ----------------
    def seed_videos(self, data):
        v = data.get('videos', {})
        for cat in v.get('videoCategories', []):
            if cat['value'] == 'all':
                continue
            VideoCategory.objects.update_or_create(
                value=cat['value'], defaults={'label': cat['label']},
            )

        videos = v.get('videos', [])
        Video.objects.all().delete()
        for i, vid in enumerate(videos):
            cat = VideoCategory.objects.filter(value=vid.get('category', '')).first()
            yt_id = vid.get('youtubeId', '')
            yt_url = (
                vid.get('youtubeUrl')
                or (f'https://www.youtube.com/watch?v={yt_id}' if yt_id else '')
            )
            Video.objects.create(
                code=vid.get('id', f'v-{i+1:02d}'),
                youtube_url=yt_url,
                title=vid.get('title', ''),
                subtitle=vid.get('subtitle', ''),
                category=cat,
                duration=vid.get('duration', ''),
                views_label=vid.get('views', ''),
                date=parse_date(vid.get('date')) or date.today(),
                is_featured=vid.get('featured', False),
                order=i,
            )
        self.stdout.write(f'  • {len(videos)} videos seeded')

    # ---------------- international ----------------
    def seed_international(self, data):
        intl = data.get('international', {})

        Memorandum.objects.all().delete()
        for i, m in enumerate(intl.get('memorandums', [])):
            Memorandum.objects.create(
                title=m.get('title', ''),
                partner=m.get('partner', ''),
                country=m.get('country', ''),
                flag_code=m.get('flagCode') or '',
                signed_at=parse_date(m.get('signedAt')) or date.today(),
                valid_until=parse_date(m.get('validUntil')),
                summary=m.get('summary', ''),
                document_number=m.get('documentNumber', ''),
                external_url=m.get('docUrl', '#'),
                order=i,
            )

        IntlConcert.objects.all().delete()
        for i, c in enumerate(intl.get('intlConcerts', [])):
            IntlConcert.objects.create(
                title=c.get('title', ''),
                partner=c.get('partner', ''),
                country=c.get('country', ''),
                flag_code=c.get('flagCode') or '',
                date=parse_date(c.get('date')) or date.today(),
                venue=c.get('venue', ''),
                summary=c.get('summary', ''),
                image_url=c.get('image', ''),
                order=i,
            )

        Competition.objects.all().delete()
        for i, c in enumerate(intl.get('competitions', [])):
            comp = Competition.objects.create(
                name=c.get('name', ''),
                year=str(c.get('year', '')),
                city=c.get('city', ''),
                country=c.get('country', ''),
                flag_code=c.get('flagCode') or '',
                category=c.get('category', ''),
                order=i,
            )
            for j, l in enumerate(c.get('laureates', [])):
                CompetitionLaureate.objects.create(
                    competition=comp,
                    name=l.get('name', ''),
                    award=l.get('award', ''),
                    order=j,
                )
        self.stdout.write('  • international (memorandums, concerts, competitions) seeded')

    # ---------------- navigation ----------------
    def seed_navigation(self, data):
        items = data.get('navigation', {}).get('navItems', [])
        NavigationItem.objects.all().delete()
        for i, item in enumerate(items):
            parent = NavigationItem.objects.create(
                label=item['label'],
                href=item.get('href', '#'),
                order=i,
            )
            for j, child in enumerate(item.get('children') or []):
                NavigationItem.objects.create(
                    parent=parent,
                    label=child['label'],
                    href=child.get('href', '#'),
                    order=j,
                )
        self.stdout.write(f'  • navigation ({len(items)} top-level items) seeded')
