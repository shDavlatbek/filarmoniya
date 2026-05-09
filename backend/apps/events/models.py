from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field

from apps.common.models import PublishableModel, TimestampedModel
from apps.common.richtext import html_to_blocks


class EventCategory(TimestampedModel):
    """Filter category (symphony, chamber, opera, festival)."""
    value = models.SlugField(max_length=64, unique=True, verbose_name="Qiymat")
    label = models.CharField(max_length=120, verbose_name="Yorlig'i")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Tadbir kategoriyasi"
        verbose_name_plural = "Tadbir kategoriyalari"

    def __str__(self):
        return self.label


class Event(PublishableModel):
    """A single performance/event. Toggle ``show_in_afisha`` to publish on the
    Afisha page; the home-page hero/list always pulls from the same model."""

    slug = models.SlugField(max_length=160, unique=True, verbose_name="Slug")
    title = models.CharField(max_length=200, verbose_name="Sarlavha")
    subtitle = models.CharField(max_length=200, blank=True, verbose_name="Qism sarlavhasi")
    excerpt = models.TextField(blank=True, verbose_name="Qisqa tavsif")

    starts_at = models.DateTimeField(verbose_name="Boshlanish vaqti")

    venue = models.CharField(max_length=160, verbose_name="Joy")
    category = models.ForeignKey(
        EventCategory,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='events',
        verbose_name="Kategoriya",
    )

    image_url = models.URLField(max_length=1000, blank=True, verbose_name="Rasm URL")
    image = models.ImageField(
        upload_to='events/', blank=True, null=True, verbose_name="Rasm fayli",
    )

    conductor = models.CharField(max_length=200, blank=True, verbose_name="Dirijyor / rejissor")
    price = models.CharField(max_length=120, blank=True, verbose_name="Narx")
    duration = models.CharField(max_length=120, blank=True, verbose_name="Davomiyligi")

    about_html = CKEditor5Field(
        config_name='extends',
        blank=True,
        verbose_name="Tadbir haqida (richtext)",
    )
    about_blocks = models.JSONField(default=list, blank=True, editable=False)

    show_in_afisha = models.BooleanField(
        default=True,
        verbose_name="Afishada ko'rsatish",
        help_text="Yoqilgan bo'lsa, /afisha sahifasida ko'rinadi.",
    )

    class Meta(PublishableModel.Meta):
        ordering = ['starts_at']
        verbose_name = "Tadbir"
        verbose_name_plural = "Tadbirlar"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:160]
        self.about_blocks = html_to_blocks(self.about_html or '')
        super().save(*args, **kwargs)

    @property
    def resolved_image(self):
        if self.image:
            return self.image.url
        return self.image_url

    UZ_MONTHS = [
        ('Yanvar', 'YAN'), ('Fevral', 'FEV'), ('Mart', 'MAR'),
        ('Aprel', 'APR'), ('May', 'MAY'), ('Iyun', 'IYN'),
        ('Iyul', 'IYL'), ('Avgust', 'AVG'), ('Sentabr', 'SEN'),
        ('Oktabr', 'OKT'), ('Noyabr', 'NOY'), ('Dekabr', 'DEK'),
    ]

    @property
    def day(self):
        return f"{self.starts_at.day:02d}"

    @property
    def month(self):
        return self.UZ_MONTHS[self.starts_at.month - 1][0]

    @property
    def month_short(self):
        return self.UZ_MONTHS[self.starts_at.month - 1][1]

    @property
    def year(self):
        return str(self.starts_at.year)

    @property
    def time(self):
        return self.starts_at.strftime('%H:%M')
