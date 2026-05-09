from rest_framework import serializers

from apps.common.serializers import absolute_url

from .models import (
    ContactEmail, ContactHours, ContactInfo, ContactMessage, ContactPhone,
    ContactSocial, ContactSubject, FooterSocialLink, HeroSlide, NavigationItem,
    Partner, SiteSettings,
)


class FooterSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterSocialLink
        fields = ('label', 'icon', 'href')


class SiteSettingsSerializer(serializers.ModelSerializer):
    socials = FooterSocialSerializer(many=True, read_only=True)

    class Meta:
        model = SiteSettings
        fields = (
            'brand_full', 'brand_short',
            'footer_address', 'footer_phone', 'footer_email',
            'copyright_line', 'socials',
        )


class HeroSlideSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = HeroSlide
        fields = ('id', 'image', 'subtext', 'title')

    def get_image(self, obj):
        return absolute_url(self.context.get('request'), obj.resolved_image)


class PartnerSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Partner
        fields = ('id', 'name', 'img', 'href')

    def get_img(self, obj):
        return absolute_url(self.context.get('request'), obj.resolved_image)


class NavigationChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavigationItem
        fields = ('label', 'href')


class NavigationItemSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = NavigationItem
        fields = ('label', 'href', 'children')

    def get_children(self, obj):
        kids = obj.children.filter(is_published=True).order_by('order', 'id')
        if not kids.exists():
            return None
        return NavigationChildSerializer(kids, many=True).data


class ContactPhoneSerializer(serializers.ModelSerializer):
    href = serializers.ReadOnlyField()

    class Meta:
        model = ContactPhone
        fields = ('label', 'value', 'href')


class ContactEmailSerializer(serializers.ModelSerializer):
    href = serializers.ReadOnlyField()

    class Meta:
        model = ContactEmail
        fields = ('label', 'value', 'href')


class ContactHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactHours
        fields = ('days', 'time')


class ContactSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSocial
        fields = ('platform', 'icon', 'href')


class ContactInfoSerializer(serializers.ModelSerializer):
    address = serializers.SerializerMethodField()
    phones = ContactPhoneSerializer(many=True, read_only=True)
    emails = ContactEmailSerializer(many=True, read_only=True)
    hours = ContactHoursSerializer(many=True, read_only=True)
    social = ContactSocialSerializer(many=True, read_only=True)
    coordinates = serializers.SerializerMethodField()
    map_embed = serializers.CharField(source='map_embed_url')
    map_link = serializers.CharField()

    class Meta:
        model = ContactInfo
        fields = (
            'address', 'phones', 'emails', 'hours', 'social',
            'map_embed', 'map_link', 'coordinates',
        )

    def get_address(self, obj):
        return {'line1': obj.address_line1, 'line2': obj.address_line2}

    def get_coordinates(self, obj):
        return {'lat': obj.latitude, 'lng': obj.longitude}


class ContactSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubject
        fields = ('name',)


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ('id', 'full_name', 'email', 'phone', 'subject', 'message', 'created_at')
        read_only_fields = ('id', 'created_at')
