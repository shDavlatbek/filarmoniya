from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe

from .models import NewsArticle


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_at', 'is_published', 'preview')
    list_filter = ('is_published', 'published_at')
    list_editable = ('is_published',)
    search_fields = ('title', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('display_date', 'body_blocks_preview', 'created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'is_published'),
        }),
        ("Sana", {
            'fields': ('published_at', 'display_date'),
        }),
        ("Qisqa ma'lumot", {
            'fields': ('excerpt', 'image_url', 'image'),
        }),
        ("Asosiy matn (boy redaktor)", {
            'fields': ('body_html', 'body_blocks_preview'),
            'description': mark_safe(
                "<b>Boy redaktor!</b> Matn kiriting, sitatani <i>blockquote</i> sifatida belgilang, "
                "rasmlarni 'Image upload' tugmasi orqali joylang. "
                "Saqlanganda sayt ko'rinishi avtomatik shakllanadi."
            ),
        }),
        ("Tizim", {
            'classes': ('collapse',),
            'fields': ('created_at', 'updated_at'),
        }),
    )

    @admin.display(description="Hero")
    def preview(self, obj):
        url = obj.resolved_image
        if url:
            return format_html('<img src="{}" style="height:48px;border:0;" />', url)
        return ''

    @admin.display(description="Avto bloklar (preview)")
    def body_blocks_preview(self, obj):
        if not obj.body_blocks:
            return "Hozircha bo'sh — saqlangandan keyin ko'rasiz."
        rows = []
        for b in obj.body_blocks:
            t = b.get('type')
            if t == 'paragraph':
                rows.append(f"<li><b>P:</b> {b.get('text', '')[:120]}…</li>")
            elif t == 'heading':
                rows.append(f"<li><b>H{b.get('level', 2)}:</b> {b.get('text', '')}</li>")
            elif t == 'image':
                rows.append(f"<li><b>IMG:</b> {b.get('src', '')[:80]}…</li>")
            elif t == 'gallery':
                rows.append(f"<li><b>GALLERY ({len(b.get('images', []))}):</b></li>")
            elif t == 'quote':
                rows.append(f"<li><b>QUOTE:</b> {b.get('text', '')[:80]}…</li>")
            elif t == 'list':
                rows.append(f"<li><b>LIST ({len(b.get('items', []))} items)</b></li>")
        return format_html('<ul>{}</ul>', format_html(''.join(rows)))
