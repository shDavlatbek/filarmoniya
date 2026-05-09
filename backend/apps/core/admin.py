from django.contrib import admin
from django.utils.html import format_html

from .models import (
    ContactEmail, ContactHours, ContactInfo, ContactMessage, ContactPhone,
    ContactSocial, ContactSubject, FooterSocialLink, HeroSlide, NavigationItem,
    Partner, SiteSettings,
)


class FooterSocialInline(admin.TabularInline):
    model = FooterSocialLink
    extra = 1


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    inlines = [FooterSocialInline]
    fieldsets = (
        ("Brending", {'fields': ('brand_full', 'brand_short')}),
        ("Footer", {'fields': ('footer_address', 'footer_phone', 'footer_email', 'copyright_line')}),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtext', 'order', 'is_published', 'preview')
    list_editable = ('order', 'is_published')
    list_filter = ('is_published',)
    search_fields = ('title', 'subtext')

    @admin.display(description="Rasm")
    def preview(self, obj):
        url = obj.resolved_image
        if url:
            return format_html('<img src="{}" style="height:48px;border:0;" />', url)
        return ''


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'order', 'is_published', 'preview')
    list_editable = ('order', 'is_published')
    search_fields = ('name',)

    @admin.display(description="Rasm")
    def preview(self, obj):
        url = obj.resolved_image
        if url:
            return format_html('<img src="{}" style="height:32px;border:0;" />', url)
        return ''


@admin.register(NavigationItem)
class NavigationItemAdmin(admin.ModelAdmin):
    list_display = ('label', 'parent', 'href', 'order', 'is_published')
    list_editable = ('order', 'is_published')
    list_filter = ('is_published',)
    search_fields = ('label', 'href')


class ContactPhoneInline(admin.TabularInline):
    model = ContactPhone
    extra = 1


class ContactEmailInline(admin.TabularInline):
    model = ContactEmail
    extra = 1


class ContactHoursInline(admin.TabularInline):
    model = ContactHours
    extra = 1


class ContactSocialInline(admin.TabularInline):
    model = ContactSocial
    extra = 1


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    inlines = [ContactPhoneInline, ContactEmailInline, ContactHoursInline, ContactSocialInline]
    fieldsets = (
        ("Manzil", {'fields': ('address_line1', 'address_line2')}),
        ("Karta", {'fields': ('map_embed_url', 'map_link', 'latitude', 'longitude')}),
    )

    def has_add_permission(self, request):
        return not ContactInfo.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(ContactSubject)
class ContactSubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    list_editable = ('order',)
    search_fields = ('name',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read', 'subject')
    search_fields = ('full_name', 'email', 'message')
    readonly_fields = ('created_at', 'updated_at')
