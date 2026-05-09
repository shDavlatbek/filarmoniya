from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field

from apps.common.models import PublishableModel, TimestampedModel
from apps.common.richtext import html_to_blocks


class Department(TimestampedModel):
    name = models.CharField(max_length=160, unique=True, verbose_name="Bo'lim nomi")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Bo'lim"
        verbose_name_plural = "Bo'limlar"

    def __str__(self):
        return self.name


class Person(PublishableModel):
    GROUP_CHOICES = [
        ('management', "Rahbariyat"),
        ('central_apparatus', "Markaziy apparat"),
    ]

    group = models.CharField(
        max_length=32,
        choices=GROUP_CHOICES,
        default='central_apparatus',
        verbose_name="Bo'linma turi",
    )
    slug = models.SlugField(max_length=160, unique=True, verbose_name="Slug")
    fullname = models.CharField(max_length=160, verbose_name="To'liq ism familiya")
    position = models.CharField(max_length=200, verbose_name="Lavozim")
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='members',
        verbose_name="Bo'lim",
    )
    schedule = models.CharField(
        max_length=200, blank=True,
        verbose_name="Qabul vaqti / Ish jadvali",
    )
    phone = models.CharField(max_length=64, blank=True, verbose_name="Telefon")
    email = models.EmailField(blank=True, verbose_name="E-mail")
    address = models.CharField(max_length=255, blank=True, verbose_name="Manzil")

    image_url = models.URLField(max_length=1000, blank=True, verbose_name="Rasm URL")
    image = models.ImageField(
        upload_to='people/', blank=True, null=True, verbose_name="Rasm fayli",
    )

    description_html = CKEditor5Field(
        config_name='extends',
        blank=True,
        verbose_name="Biografiya (richtext)",
    )
    description_blocks = models.JSONField(default=list, blank=True, editable=False)

    class Meta(PublishableModel.Meta):
        verbose_name = "Xodim"
        verbose_name_plural = "Xodimlar"

    def __str__(self):
        return f"{self.fullname} — {self.position}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.fullname)[:160]
        self.description_blocks = html_to_blocks(self.description_html or '')
        super().save(*args, **kwargs)

    @property
    def resolved_image(self):
        if self.image:
            return self.image.url
        return self.image_url


class PersonSocial(TimestampedModel):
    person = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name='social',
        verbose_name="Xodim",
    )
    platform = models.CharField(max_length=64, verbose_name="Platforma")
    href = models.URLField(verbose_name="Havola")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Xodim ijtimoiy havolasi"
        verbose_name_plural = "Xodim ijtimoiy havolalari"

    def __str__(self):
        return f"{self.person.fullname}: {self.platform}"
