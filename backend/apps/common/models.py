from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan")

    class Meta:
        abstract = True


class PublishableModel(TimestampedModel):
    is_published = models.BooleanField(
        default=True,
        verbose_name="Aktiv",
        help_text="Faqat yoqilgan yozuvlar saytda ko'rinadi.",
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Tartib raqami",
        help_text="Past raqamlar avval ko'rsatiladi.",
    )

    class Meta:
        abstract = True
        ordering = ['order', '-created_at']
