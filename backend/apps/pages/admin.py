from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe

from .models import (
    AboutMilestone, AboutPage, AboutStat,
    ChapteredDocument, DocumentAttachment,
)


class AboutStatInline(admin.TabularInline):
    model = AboutStat
    extra = 1


class AboutMilestoneInline(admin.StackedInline):
    model = AboutMilestone
    extra = 1


@admin.register(AboutPage)
class AboutPageAdmin(admin.ModelAdmin):
    inlines = [AboutStatInline, AboutMilestoneInline]
    fieldsets = (
        ("Hero", {'fields': ('hero_eyebrow', 'hero_title', 'hero_subtitle', 'hero_image_url', 'hero_image')}),
        ("Kirish bo'limi (richtext)", {
            'fields': ('intro_title', 'intro_body_html'),
            'description': "Boy redaktorda matn yozing — sayt avtomatik paragraflarga ajratadi.",
        }),
        ("Missiya", {'fields': ('mission_title', 'mission_text')}),
    )

    def has_add_permission(self, request):
        return not AboutPage.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


class DocumentAttachmentInline(admin.TabularInline):
    model = DocumentAttachment
    extra = 1


@admin.register(ChapteredDocument)
class ChapteredDocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'kind', 'document_number', 'published_date', 'chapters_summary')
    list_filter = ('kind',)
    inlines = [DocumentAttachmentInline]
    readonly_fields = ('chapters_preview',)
    fieldsets = (
        (None, {'fields': ('kind', 'eyebrow', 'title', 'subtitle')}),
        ("Tasdiqlash", {'fields': ('approved_by', 'published_date', 'document_number')}),
        ("Hujjat matni (richtext)", {
            'fields': ('body_html', 'chapters_preview'),
            'description': mark_safe(
                "<b>Bitta maydonda butun hujjat.</b><br/>"
                "<code>H2</code> sarlavhasi → <b>Bob</b> "
                "(masalan: <i>I bob — Umumiy qoidalar</i>)<br/>"
                "<code>H3</code> sarlavhasi → <b>Modda</b> "
                "(masalan: <i>1-modda</i>)<br/>"
                "Modda ichida ikki nuqta <code>:</code> bilan tugagan paragraf va undan "
                "keyingi ro'yxat birga modda kirishi va bandlariga ajratiladi."
            ),
        }),
    )

    @admin.display(description="Boblar")
    def chapters_summary(self, obj):
        chapters = obj.body_chapters or []
        return f"{len(chapters)} bob, {sum(len(c.get('articles', [])) for c in chapters)} modda"

    @admin.display(description="Avtomatik tuzilma (preview)")
    def chapters_preview(self, obj):
        chapters = obj.body_chapters or []
        if not chapters:
            return "Hozircha bo'sh — saqlangandan keyin ko'rasiz."
        rows = []
        for ch in chapters:
            articles = ch.get('articles', [])
            rows.append(
                f'<li><b>{_safe(ch.get("number") or "?")}</b> — '
                f'{_safe(ch.get("title") or "")} '
                f'<i>({len(articles)} modda)</i></li>'
            )
        return format_html('<ol>{}</ol>', format_html(''.join(rows)))


def _safe(text):
    return (text or '').replace('<', '&lt;').replace('>', '&gt;')
