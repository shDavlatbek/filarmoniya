from rest_framework import generics, mixins, viewsets
from rest_framework.permissions import AllowAny

from .models import (
    ContactInfo, ContactMessage, ContactSubject, HeroSlide, NavigationItem,
    Partner, SiteSettings,
)
from .serializers import (
    ContactInfoSerializer, ContactMessageSerializer, ContactSubjectSerializer,
    HeroSlideSerializer, NavigationItemSerializer, PartnerSerializer,
    SiteSettingsSerializer,
)


class SiteSettingsView(generics.RetrieveAPIView):
    serializer_class = SiteSettingsSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return SiteSettings.load()


class HeroSlideListView(generics.ListAPIView):
    queryset = HeroSlide.objects.filter(is_published=True).order_by('order', 'id')
    serializer_class = HeroSlideSerializer
    pagination_class = None
    permission_classes = [AllowAny]


class PartnerListView(generics.ListAPIView):
    queryset = Partner.objects.filter(is_published=True).order_by('order', 'id')
    serializer_class = PartnerSerializer
    pagination_class = None
    permission_classes = [AllowAny]


class NavigationListView(generics.ListAPIView):
    queryset = NavigationItem.objects.filter(parent__isnull=True, is_published=True).order_by('order', 'id')
    serializer_class = NavigationItemSerializer
    pagination_class = None
    permission_classes = [AllowAny]


class ContactInfoView(generics.RetrieveAPIView):
    serializer_class = ContactInfoSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return ContactInfo.load()


class ContactSubjectListView(generics.ListAPIView):
    queryset = ContactSubject.objects.all().order_by('order', 'id')
    serializer_class = ContactSubjectSerializer
    pagination_class = None
    permission_classes = [AllowAny]


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
