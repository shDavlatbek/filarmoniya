from django.db import models

from apps.common.models import PublishableModel, TimestampedModel


class Memorandum(PublishableModel):
    title = models.CharField(max_length=300, verbose_name="Sarlavha")
    partner = models.CharField(max_length=200, verbose_name="Hamkor")
    country = models.CharField(max_length=120, verbose_name="Davlat")
    flag_code = models.CharField(
        max_length=8, blank=True,
        verbose_name="Bayroq kodi",
        help_text="ISO 3166-1 alpha-2: at, de, ru, kr, it, kz...",
    )
    signed_at = models.DateField(verbose_name="Imzolangan sana")
    valid_until = models.DateField(null=True, blank=True, verbose_name="Amal qilish muddati")
    summary = models.TextField(verbose_name="Qisqacha bayon")
    document_number = models.CharField(max_length=64, blank=True, verbose_name="Hujjat raqami")
    file = models.FileField(upload_to='memorandums/', blank=True, null=True, verbose_name="Fayl")
    external_url = models.CharField(max_length=500, blank=True, default='#', verbose_name="Tashqi havola")

    class Meta(PublishableModel.Meta):
        ordering = ['-signed_at']
        verbose_name = "Memorandum"
        verbose_name_plural = "Memorandumlar"

    def __str__(self):
        return self.title

    @property
    def resolved_url(self):
        if self.file:
            return self.file.url
        return self.external_url


class IntlConcert(PublishableModel):
    title = models.CharField(max_length=300, verbose_name="Sarlavha")
    partner = models.CharField(max_length=200, verbose_name="Hamkor")
    country = models.CharField(max_length=120, verbose_name="Davlat")
    flag_code = models.CharField(max_length=8, blank=True, verbose_name="Bayroq kodi")
    date = models.DateField(verbose_name="Sana")
    venue = models.CharField(max_length=200, verbose_name="Joy")
    summary = models.TextField(verbose_name="Qisqacha bayon")
    image_url = models.URLField(max_length=1000, blank=True, verbose_name="Rasm URL")
    image = models.ImageField(upload_to='intl_concerts/', blank=True, null=True, verbose_name="Rasm fayli")

    class Meta(PublishableModel.Meta):
        ordering = ['-date']
        verbose_name = "Qo'shma konsert"
        verbose_name_plural = "Qo'shma konsertlar"

    def __str__(self):
        return self.title

    @property
    def resolved_image(self):
        if self.image:
            return self.image.url
        return self.image_url


class Competition(PublishableModel):
    name = models.CharField(max_length=300, verbose_name="Tanlov nomi")
    year = models.CharField(max_length=8, verbose_name="Yil")
    city = models.CharField(max_length=120, verbose_name="Shahar")
    country = models.CharField(max_length=120, verbose_name="Davlat")
    flag_code = models.CharField(max_length=8, blank=True, verbose_name="Bayroq kodi")
    category = models.CharField(max_length=120, blank=True, verbose_name="Yo'nalish")

    class Meta(PublishableModel.Meta):
        ordering = ['-year', 'name']
        verbose_name = "Xalqaro tanlov"
        verbose_name_plural = "Xalqaro tanlovlar"

    def __str__(self):
        return f"{self.name} ({self.year})"


class CompetitionLaureate(TimestampedModel):
    competition = models.ForeignKey(
        Competition, related_name='laureates', on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=200, verbose_name="Ism")
    award = models.CharField(max_length=200, verbose_name="Mukofot")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Laureat"
        verbose_name_plural = "Laureatlar"

    def __str__(self):
        return f"{self.name} — {self.award}"
