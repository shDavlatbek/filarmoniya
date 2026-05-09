from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

from apps.common.models import TimestampedModel
from apps.common.richtext import html_to_blocks


# ============ About page (singleton) ============

class AboutPage(TimestampedModel):
    """Single record. Hero, intro, mission."""
    hero_eyebrow = models.CharField(max_length=120, default="FILARMONIYA")
    hero_title = models.CharField(max_length=200, default="Biz haqimizda")
    hero_subtitle = models.TextField(blank=True)
    hero_image_url = models.URLField(max_length=1000, blank=True)
    hero_image = models.ImageField(upload_to='about/', blank=True, null=True)

    intro_title = models.CharField(max_length=200, default="Bir asrlik rezonans")
    intro_body_html = CKEditor5Field(
        config_name='extends', blank=True,
        verbose_name="Kirish bo'limi matni",
    )
    intro_body_blocks = models.JSONField(default=list, blank=True, editable=False)

    mission_title = models.CharField(max_length=200, default="Bizning missiya")
    mission_text = models.TextField(blank=True)

    class Meta:
        verbose_name = "Biz haqimizda sahifasi"
        verbose_name_plural = "Biz haqimizda sahifasi"

    def __str__(self):
        return "Biz haqimizda"

    def save(self, *args, **kwargs):
        self.pk = 1
        self.intro_body_blocks = html_to_blocks(self.intro_body_html or '')
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class AboutStat(TimestampedModel):
    page = models.ForeignKey(
        AboutPage, related_name='stats', on_delete=models.CASCADE,
    )
    value = models.CharField(max_length=64, verbose_name="Qiymat (85+, 320...)")
    label = models.CharField(max_length=200, verbose_name="Yorlig'i")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Statistika"
        verbose_name_plural = "Statistika"

    def __str__(self):
        return f"{self.value} — {self.label}"


class AboutMilestone(TimestampedModel):
    page = models.ForeignKey(
        AboutPage, related_name='milestones', on_delete=models.CASCADE,
    )
    year = models.CharField(max_length=16, verbose_name="Yil")
    title = models.CharField(max_length=200, verbose_name="Sarlavha")
    description = models.TextField(verbose_name="Tavsif")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'year']
        verbose_name = "Tarixiy bosqich"
        verbose_name_plural = "Tarixiy bosqichlar"

    def __str__(self):
        return f"{self.year} — {self.title}"


# ============ Chaptered docs (Statute, Youth Politics) ============
# Single rich-text field. Admin types the whole document with <h2> headings
# for chapters, <h3> headings for articles. The save hook parses the HTML
# into the structured `body_chapters` JSON the API exposes.

from apps.common.chapter_parser import html_to_chapters  # noqa: E402


class ChapteredDocument(TimestampedModel):
    KIND_CHOICES = [
        ('statute', 'Muassasa nizomi'),
        ('youth_politics', 'Yoshlar siyosati'),
    ]

    kind = models.CharField(
        max_length=32,
        choices=KIND_CHOICES,
        unique=True,
        verbose_name="Hujjat turi",
    )
    eyebrow = models.CharField(max_length=120, default="Me'yoriy hujjatlar")
    title = models.CharField(max_length=255, verbose_name="Sarlavha")
    subtitle = models.TextField(blank=True, verbose_name="Subtitle")
    approved_by = models.TextField(blank=True, verbose_name="Tasdiqlovchi")
    published_date = models.DateField(null=True, blank=True, verbose_name="E'lon qilingan sana")
    document_number = models.CharField(max_length=64, blank=True, verbose_name="Hujjat raqami")

    body_html = CKEditor5Field(
        config_name='extends',
        blank=True,
        verbose_name="To'liq matn (richtext)",
        help_text=(
            "<b>Bir maydonda butun hujjat.</b> "
            "<code>&lt;h2&gt;</code> sarlavhasi — bob (masalan: <i>I bob — Umumiy qoidalar</i>). "
            "<code>&lt;h3&gt;</code> sarlavhasi — modda (masalan: <i>1-modda</i>). "
            "Saqlanganda boblar va moddalar avtomatik ajratiladi."
        ),
    )
    body_chapters = models.JSONField(
        default=list,
        blank=True,
        editable=False,
        verbose_name="Avtomatik bob/modda tuzilmasi",
    )

    class Meta:
        verbose_name = "Bo'limlarga ajratilgan hujjat"
        verbose_name_plural = "Bo'limlarga ajratilgan hujjatlar"

    def __str__(self):
        return self.get_kind_display()

    def save(self, *args, **kwargs):
        self.body_chapters = html_to_chapters(self.body_html or '')
        super().save(*args, **kwargs)


class DocumentAttachment(TimestampedModel):
    document = models.ForeignKey(
        ChapteredDocument, related_name='attachments', on_delete=models.CASCADE,
    )
    label = models.CharField(max_length=255, verbose_name="Yorlig'i")
    href = models.CharField(max_length=500, default='#', verbose_name="Havola")
    file = models.FileField(upload_to='attachments/', blank=True, null=True)
    size = models.CharField(max_length=64, blank=True, verbose_name="Hajm yorlig'i")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Ilova"
        verbose_name_plural = "Ilovalar"

    def __str__(self):
        return self.label

    @property
    def resolved_href(self):
        if self.file:
            return self.file.url
        return self.href
