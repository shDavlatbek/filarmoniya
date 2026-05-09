from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field

from apps.common.models import PublishableModel
from apps.common.richtext import html_to_blocks


class Team(PublishableModel):
    name = models.CharField(max_length=160, verbose_name="To'liq nomi")
    short_name = models.CharField(max_length=120, verbose_name="Qisqa nomi")
    slug = models.SlugField(max_length=160, unique=True, verbose_name="Slug")
    genre = models.CharField(max_length=120, blank=True, verbose_name="Janr")
    founded = models.CharField(max_length=16, blank=True, verbose_name="Tashkil topgan yil")
    directed_by = models.CharField(max_length=160, blank=True, verbose_name="Badiiy rahbar")
    members_count = models.CharField(max_length=120, blank=True, verbose_name="A'zolar soni")
    home_stage = models.CharField(max_length=160, blank=True, verbose_name="Asosiy sahna")
    excerpt = models.TextField(blank=True, verbose_name="Qisqa ma'lumot")
    image_url = models.URLField(max_length=1000, blank=True, verbose_name="Rasm URL")
    image = models.ImageField(upload_to='teams/', blank=True, null=True, verbose_name="Rasm fayli")

    body_html = CKEditor5Field(
        config_name='extends',
        blank=True,
        verbose_name="To'liq matn (richtext)",
    )
    body_blocks = models.JSONField(default=list, blank=True, editable=False)

    class Meta(PublishableModel.Meta):
        verbose_name = "Ijodiy jamoa"
        verbose_name_plural = "Ijodiy jamoalar"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.short_name or self.name)[:160]
        self.body_blocks = html_to_blocks(self.body_html or '')
        super().save(*args, **kwargs)

    @property
    def resolved_image(self):
        if self.image:
            return self.image.url
        return self.image_url
