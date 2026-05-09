from django.db import models

from apps.common.models import PublishableModel


class _DocumentBase(PublishableModel):
    title = models.CharField(max_length=500, verbose_name="Sarlavha")
    type = models.CharField(max_length=120, verbose_name="Turi")
    date = models.DateField(verbose_name="Sana")
    document_number = models.CharField(max_length=64, blank=True, verbose_name="Hujjat raqami")
    file = models.FileField(upload_to='docs/', blank=True, null=True, verbose_name="Fayl")
    external_url = models.CharField(
        max_length=500, blank=True, default='#',
        verbose_name="Tashqi havola",
    )
    size = models.CharField(
        max_length=32, blank=True,
        verbose_name="Hajm",
        help_text="Bo'sh qoldirilsa fayl hajmidan avtomatik hisoblanadi.",
    )
    format = models.CharField(
        max_length=16,
        default='PDF',
        verbose_name="Format",
        help_text="PDF, DOCX, XLSX, CSV...",
    )

    class Meta(PublishableModel.Meta):
        abstract = True

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.file and not self.size:
            try:
                kb = self.file.size / 1024
                if kb >= 1024:
                    self.size = f"{kb / 1024:.1f} MB"
                else:
                    self.size = f"{int(kb)} KB"
            except (FileNotFoundError, ValueError):
                pass
        super().save(*args, **kwargs)

    @property
    def resolved_url(self):
        if self.file:
            return self.file.url
        return self.external_url


class Document(_DocumentBase):
    class Meta(_DocumentBase.Meta):
        ordering = ['-date']
        verbose_name = "Me'yoriy hujjat"
        verbose_name_plural = "Me'yoriy hujjatlar"


class OpenDataItem(_DocumentBase):
    class Meta(_DocumentBase.Meta):
        ordering = ['-date']
        verbose_name = "Ochiq ma'lumot"
        verbose_name_plural = "Ochiq ma'lumotlar"


class PressRelease(_DocumentBase):
    class Meta(_DocumentBase.Meta):
        ordering = ['-date']
        verbose_name = "Press-reliz"
        verbose_name_plural = "Press-relizlar"
