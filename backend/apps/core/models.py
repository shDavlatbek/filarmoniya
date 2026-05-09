from django.core.exceptions import ValidationError
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

from apps.common.models import PublishableModel, TimestampedModel


class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        return None

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class SiteSettings(SingletonModel, TimestampedModel):
    brand_full = models.CharField(
        max_length=255,
        default="O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
        verbose_name="Saytning to'liq nomi",
    )
    brand_short = models.CharField(
        max_length=120,
        default="Filarmoniya",
        verbose_name="Qisqa nom",
    )
    footer_address = models.CharField(
        max_length=255,
        default="Toshkent shahri, Navoiy ko'chasi, 2-uy",
        verbose_name="Footer manzili",
    )
    footer_phone = models.CharField(
        max_length=64,
        default="+998 71 234 56 78",
        verbose_name="Footer telefoni",
    )
    footer_email = models.EmailField(
        default="info@filarmoniya.uz",
        verbose_name="Footer e-mail",
    )
    copyright_line = models.CharField(
        max_length=255,
        default="© 2026 O'zbekiston Respublikasi Madaniyat Vazirligi. Barcha huquqlar himoyalangan.",
        verbose_name="Copyright satri",
    )

    class Meta:
        verbose_name = "Sayt sozlamalari"
        verbose_name_plural = "Sayt sozlamalari"

    def __str__(self):
        return "Sayt sozlamalari"


class FooterSocialLink(TimestampedModel):
    site = models.ForeignKey(
        SiteSettings,
        related_name='socials',
        on_delete=models.CASCADE,
        verbose_name="Sayt",
    )
    label = models.CharField(max_length=64, verbose_name="Nomi")
    icon = models.CharField(
        max_length=64,
        verbose_name="Icon kalit so'zi",
        help_text="masalan: telegram, instagram, facebook, youtube",
    )
    href = models.URLField(verbose_name="Havola")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Footer ijtimoiy havola"
        verbose_name_plural = "Footer ijtimoiy havolalar"

    def __str__(self):
        return self.label


class HeroSlide(PublishableModel):
    image_url = models.URLField(
        blank=True,
        verbose_name="Rasm URL",
        help_text="Yoki quyida fayl yuklang.",
    )
    image = models.ImageField(
        upload_to='hero/',
        blank=True,
        null=True,
        verbose_name="Rasm fayli",
    )
    subtext = models.CharField(max_length=255, verbose_name="Yuqori matn")
    title = models.CharField(max_length=255, verbose_name="Asosiy sarlavha")

    class Meta(PublishableModel.Meta):
        verbose_name = "Hero slayd"
        verbose_name_plural = "Hero slaydlari"

    def __str__(self):
        return self.title

    @property
    def resolved_image(self):
        if self.image:
            return self.image.url
        return self.image_url


class Partner(PublishableModel):
    name = models.CharField(max_length=120, verbose_name="Hamkor nomi")
    image_url = models.CharField(
        max_length=500,
        blank=True,
        verbose_name="Rasm URL/yo'l",
        help_text="Public path yoki URL: /images/partners/ucell.png",
    )
    image = models.ImageField(
        upload_to='partners/',
        blank=True,
        null=True,
        verbose_name="Rasm fayli",
    )
    href = models.URLField(blank=True, verbose_name="Havola")

    class Meta(PublishableModel.Meta):
        verbose_name = "Hamkor"
        verbose_name_plural = "Hamkorlar"

    def __str__(self):
        return self.name

    @property
    def resolved_image(self):
        if self.image:
            return self.image.url
        return self.image_url


class NavigationItem(MPTTModel, TimestampedModel):
    parent = TreeForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True, blank=True,
        related_name='children',
        verbose_name="Ota element",
    )
    label = models.CharField(max_length=120, verbose_name="Nomi")
    href = models.CharField(
        max_length=255,
        default='#',
        verbose_name="Havola",
        help_text="Sayt ichida: /news, /about. Tashqi: https://...",
    )
    is_published = models.BooleanField(default=True, verbose_name="Faol")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class MPTTMeta:
        order_insertion_by = ['order', 'label']

    class Meta:
        verbose_name = "Navigatsiya elementi"
        verbose_name_plural = "Navigatsiya"

    def __str__(self):
        return self.label


class ContactInfo(SingletonModel, TimestampedModel):
    address_line1 = models.CharField(
        max_length=255,
        default="Toshkent shahri, Mustaqillik maydoni 1-uy",
        verbose_name="Manzil 1-qator",
    )
    address_line2 = models.CharField(
        max_length=255,
        default="100047, O'zbekiston Respublikasi",
        verbose_name="Manzil 2-qator",
    )
    map_embed_url = models.URLField(
        max_length=1000,
        blank=True,
        default="https://www.openstreetmap.org/export/embed.html?bbox=69.2357%2C41.3070%2C69.2527%2C41.3170&layer=mapnik&marker=41.312000%2C69.244200",
        verbose_name="Karta embed URL",
    )
    map_link = models.URLField(
        max_length=1000,
        blank=True,
        default="https://www.openstreetmap.org/?mlat=41.312&mlon=69.2442#map=17/41.312/69.2442",
        verbose_name="Karta havolasi",
    )
    latitude = models.FloatField(default=41.312, verbose_name="Kenglik")
    longitude = models.FloatField(default=69.2442, verbose_name="Uzunlik")

    class Meta:
        verbose_name = "Aloqa ma'lumotlari"
        verbose_name_plural = "Aloqa ma'lumotlari"

    def __str__(self):
        return "Aloqa ma'lumotlari"


class ContactPhone(TimestampedModel):
    info = models.ForeignKey(
        ContactInfo,
        related_name='phones',
        on_delete=models.CASCADE,
        verbose_name="Aloqa",
    )
    label = models.CharField(max_length=120, verbose_name="Nomi")
    value = models.CharField(max_length=64, verbose_name="Telefon")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Telefon raqami"
        verbose_name_plural = "Telefon raqamlari"

    def __str__(self):
        return f"{self.label}: {self.value}"

    @property
    def href(self):
        return 'tel:' + self.value.replace(' ', '').replace('-', '')


class ContactEmail(TimestampedModel):
    info = models.ForeignKey(
        ContactInfo,
        related_name='emails',
        on_delete=models.CASCADE,
        verbose_name="Aloqa",
    )
    label = models.CharField(max_length=120, verbose_name="Nomi")
    value = models.EmailField(verbose_name="E-mail")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "E-mail manzili"
        verbose_name_plural = "E-mail manzillari"

    def __str__(self):
        return f"{self.label}: {self.value}"

    @property
    def href(self):
        return 'mailto:' + self.value


class ContactHours(TimestampedModel):
    info = models.ForeignKey(
        ContactInfo,
        related_name='hours',
        on_delete=models.CASCADE,
        verbose_name="Aloqa",
    )
    days = models.CharField(max_length=120, verbose_name="Kunlar")
    time = models.CharField(max_length=120, verbose_name="Soatlar")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Ish vaqti"
        verbose_name_plural = "Ish vaqti"

    def __str__(self):
        return f"{self.days}: {self.time}"


class ContactSocial(TimestampedModel):
    info = models.ForeignKey(
        ContactInfo,
        related_name='social',
        on_delete=models.CASCADE,
        verbose_name="Aloqa",
    )
    platform = models.CharField(max_length=64, verbose_name="Platforma")
    icon = models.CharField(
        max_length=64,
        verbose_name="Icon (Material Symbols)",
        help_text="Masalan: send, photo_camera, smart_display, public",
    )
    href = models.URLField(verbose_name="Havola")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Aloqa: ijtimoiy tarmoq"
        verbose_name_plural = "Aloqa: ijtimoiy tarmoqlar"

    def __str__(self):
        return self.platform


class ContactSubject(TimestampedModel):
    name = models.CharField(max_length=120, unique=True, verbose_name="Mavzu")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Murojaat mavzusi"
        verbose_name_plural = "Murojaat mavzulari"

    def __str__(self):
        return self.name


class ContactMessage(TimestampedModel):
    full_name = models.CharField(max_length=120, verbose_name="To'liq ism")
    email = models.EmailField(verbose_name="E-mail")
    phone = models.CharField(max_length=64, blank=True, verbose_name="Telefon")
    subject = models.CharField(max_length=160, verbose_name="Mavzu")
    message = models.TextField(verbose_name="Xabar")
    is_read = models.BooleanField(default=False, verbose_name="O'qilgan")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Murojaat"
        verbose_name_plural = "Murojaatlar"

    def __str__(self):
        return f"{self.full_name} — {self.subject}"
