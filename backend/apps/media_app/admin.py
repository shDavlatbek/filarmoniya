from django.contrib import admin, messages
from django.utils.html import format_html
from django.utils.safestring import mark_safe

from .models import Video, VideoCategory


@admin.register(VideoCategory)
class VideoCategoryAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'order')
    list_editable = ('order',)
    prepopulated_fields = {'value': ('label',)}


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = (
        'thumb', 'title', 'youtube_id', 'category', 'duration',
        'views_label', 'date', 'is_featured', 'is_published',
    )
    list_display_links = ('thumb', 'title')
    list_filter = ('category', 'is_featured', 'is_published')
    list_editable = ('is_published', 'is_featured')
    search_fields = ('title', 'subtitle', 'youtube_url', 'youtube_id')
    readonly_fields = ('youtube_id', 'thumbnail_url', 'metadata_fetched_at', 'thumb_preview')
    actions = ['refresh_metadata']

    fieldsets = (
        (None, {
            'fields': ('is_published', 'is_featured', 'order'),
        }),
        ("YouTube havolasi", {
            'fields': ('youtube_url', 'youtube_id', 'thumb_preview'),
            'description': mark_safe(
                "<p style='margin:0 0 8px 0;'>"
                "<b>To'liq YouTube havolasini joylang.</b> "
                "Saqlanganda <b>sarlavha, davomiylik, ko'rishlar soni va e'lon sanasi</b> "
                "YouTubedan avtomatik olinadi (qo'lda yozilgan qiymatlar ustiga yozilmaydi)."
                "</p>"
                "<p style='margin:0;'>Qabul qilinadigan formatlar: "
                "<code>https://www.youtube.com/watch?v=ID</code>, "
                "<code>https://youtu.be/ID</code>, "
                "<code>https://www.youtube.com/embed/ID</code>, "
                "<code>https://www.youtube.com/shorts/ID</code>.</p>"
            ),
        }),
        ("Tafsilotlar (avtomatik to'ldiriladi)", {
            'fields': ('title', 'subtitle', 'category', 'duration', 'views_label', 'date'),
            'description': mark_safe(
                "Bo'sh maydonlar saqlanganda YouTubedan to'ldiriladi. "
                "Qiymatni o'zgartirsangiz, qo'lda yozilgan qiymat saqlanadi. "
                "Hammasini qaytadan tortish uchun ro'yxatdan "
                "<i>«YouTubedan metadata-ni yangilash»</i> amalini tanlang."
            ),
        }),
        ("Tizim", {
            'classes': ('collapse',),
            'fields': ('code', 'thumbnail_url', 'metadata_fetched_at'),
        }),
    )

    @admin.display(description="Thumbnail")
    def thumb(self, obj):
        if obj.youtube_id:
            return format_html(
                '<img src="https://i.ytimg.com/vi/{}/mqdefault.jpg" '
                'style="height:48px;border:0;" />',
                obj.youtube_id,
            )
        return ''

    @admin.display(description="Thumbnail preview")
    def thumb_preview(self, obj):
        if obj.youtube_id:
            return format_html(
                '<img src="https://i.ytimg.com/vi/{}/hqdefault.jpg" '
                'style="max-height:160px;border:0;" />',
                obj.youtube_id,
            )
        return "Saqlangach ko'rinadi."

    @admin.action(description="YouTubedan metadata-ni yangilash")
    def refresh_metadata(self, request, queryset):
        ok = 0
        failed = 0
        for video in queryset:
            try:
                video.refresh_from_youtube()
                ok += 1
            except Exception:  # noqa: BLE001
                failed += 1
        if ok:
            self.message_user(request, f"{ok} ta videoning ma'lumoti yangilandi.", messages.SUCCESS)
        if failed:
            self.message_user(request, f"{failed} ta videoda xatolik.", messages.WARNING)
