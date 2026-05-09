from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from apps.common.models import PublishableModel, TimestampedModel
from apps.common.youtube import extract_youtube_id
from apps.common.youtube_meta import fetch_metadata


class VideoCategory(TimestampedModel):
    value = models.SlugField(max_length=64, unique=True, verbose_name="Qiymat")
    label = models.CharField(max_length=120, verbose_name="Yorlig'i")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Video kategoriyasi"
        verbose_name_plural = "Video kategoriyalari"

    def __str__(self):
        return self.label


class Video(PublishableModel):
    code = models.CharField(
        max_length=32, unique=True, verbose_name="Kod (v-01)",
        help_text="Ichki identifikator. Bo'sh qoldirsangiz avtomatik shakllanadi.",
        blank=True,
    )
    youtube_url = models.URLField(
        max_length=500,
        default='',
        blank=True,
        verbose_name="YouTube havolasi",
        help_text=(
            "To'liq YouTube havolasini joylang. Sarlavha, davomiylik, "
            "ko'rishlar va e'lon sanasi YouTubedan avtomatik olinadi."
        ),
    )
    youtube_id = models.CharField(
        max_length=16,
        editable=False,
        blank=True,
        default='',
        verbose_name="YouTube ID",
        help_text="Havoladan avtomatik olinadi.",
    )
    title = models.CharField(
        max_length=200,
        blank=True,
        verbose_name="Sarlavha",
        help_text="Bo'sh qoldirsangiz YouTubedan olinadi.",
    )
    subtitle = models.CharField(max_length=255, blank=True, verbose_name="Subtitle")
    category = models.ForeignKey(
        VideoCategory,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='videos',
        verbose_name="Kategoriya",
    )
    duration = models.CharField(
        max_length=32, blank=True,
        verbose_name="Davomiyligi",
        help_text="Bo'sh qoldirsangiz YouTubedan olinadi.",
    )
    views_label = models.CharField(
        max_length=32, blank=True,
        verbose_name="Ko'rishlar",
        help_text="Bo'sh qoldirsangiz YouTubedan olinadi (masalan: 124K).",
    )
    date = models.DateField(
        null=True, blank=True,
        verbose_name="Sana",
        help_text="Bo'sh qoldirsangiz YouTubedan olinadi.",
    )
    thumbnail_url = models.URLField(
        max_length=1000, blank=True,
        editable=False,
        verbose_name="YouTube thumbnail",
    )
    is_featured = models.BooleanField(default=False, verbose_name="Asosiy video")
    metadata_fetched_at = models.DateTimeField(
        null=True, blank=True, editable=False,
        verbose_name="Metadata olingan vaqt",
    )

    class Meta(PublishableModel.Meta):
        ordering = ['-date']
        verbose_name = "Video"
        verbose_name_plural = "Videolar"

    def __str__(self):
        return self.title or self.youtube_id or 'Video'

    def clean(self):
        super().clean()
        if self.youtube_url and not extract_youtube_id(self.youtube_url):
            raise ValidationError({
                'youtube_url': "Bu havoladan YouTube ID ajratib bo'lmadi. "
                               "Havola to'g'ri ekanligini tekshiring.",
            })

    def save(self, *args, **kwargs):
        """Auto-extract YouTube id from URL and fill blank fields from YouTube
        metadata. Manually-entered values are NEVER overwritten — to refresh,
        use the admin's 'Refresh from YouTube' bulk action."""
        new_id = extract_youtube_id(self.youtube_url or '')
        url_changed = new_id and new_id != self.youtube_id
        self.youtube_id = new_id

        if not self.code:
            last = Video.objects.order_by('-id').first()
            n = (last.id if last else 0) + 1
            self.code = f"v-{n:02d}"

        needs_fetch = self.youtube_url and (
            url_changed
            or not self.title or not self.duration
            or not self.views_label or not self.date
            or not self.thumbnail_url
        )
        if needs_fetch:
            self._populate_from_youtube(force=False)

        super().save(*args, **kwargs)

    def _populate_from_youtube(self, *, force: bool):
        """Pull metadata; only fill empty fields unless force=True."""
        meta = fetch_metadata(self.youtube_url)
        if not meta.has_any:
            return
        if force or not self.title:
            self.title = meta.title or self.title
        if force or not self.duration:
            self.duration = meta.duration or self.duration
        if force or not self.views_label:
            self.views_label = meta.views or self.views_label
        if force or not self.date:
            self.date = meta.upload_date or self.date
        if force or not self.thumbnail_url:
            self.thumbnail_url = meta.thumbnail_url or self.thumbnail_url
        self.metadata_fetched_at = timezone.now()

    def refresh_from_youtube(self):
        """Re-pull all metadata, overwriting the existing values."""
        self._populate_from_youtube(force=True)
        self.save()
