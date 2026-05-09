from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field

from apps.common.models import TimestampedModel
from apps.common.richtext import html_to_blocks


class NewsArticle(TimestampedModel):
    title = models.CharField(max_length=255, verbose_name="Sarlavha")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug (URL)")
    published_at = models.DateField(verbose_name="Sana")
    display_date = models.CharField(
        max_length=64,
        blank=True,
        verbose_name="Ko'rsatiladigan sana",
        help_text="Bo'sh qoldirsangiz Sanadan avtomatik shakllanadi (Oktabr 08, 2024).",
    )
    excerpt = models.TextField(verbose_name="Lid (qisqa tavsif)")
    image_url = models.URLField(
        max_length=1000,
        blank=True,
        verbose_name="Hero rasm URL",
    )
    image = models.ImageField(
        upload_to='news/', blank=True, null=True, verbose_name="Hero rasm fayli",
    )

    body_html = CKEditor5Field(
        config_name='extends',
        verbose_name="To'liq matn (richtext)",
        help_text="Boy matn redaktoriga matn, surat, sitata yozing — sayt o'zi to'g'ri ko'rinishga keltiradi.",
    )
    body_blocks = models.JSONField(
        default=list,
        blank=True,
        editable=False,
        verbose_name="Avtomatik bloklar",
    )

    is_published = models.BooleanField(default=True, verbose_name="Aktiv")

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name = "Yangilik"
        verbose_name_plural = "Yangiliklar"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:255]
        if not self.display_date and self.published_at:
            uz_months = [
                'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
                'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
            ]
            self.display_date = (
                f"{uz_months[self.published_at.month - 1]} "
                f"{self.published_at.day:02d}, {self.published_at.year}"
            )
        self.body_blocks = html_to_blocks(self.body_html or '')
        super().save(*args, **kwargs)

    @property
    def resolved_image(self):
        if self.image:
            return self.image.url
        return self.image_url
