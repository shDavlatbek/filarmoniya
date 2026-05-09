from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import AboutPage, ChapteredDocument
from .serializers import AboutPageSerializer, ChapteredDocumentSerializer


class AboutPageView(generics.RetrieveAPIView):
    serializer_class = AboutPageSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return AboutPage.load()


class StatuteView(generics.RetrieveAPIView):
    serializer_class = ChapteredDocumentSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return get_object_or_404(ChapteredDocument, kind='statute')


class YouthPoliticsView(generics.RetrieveAPIView):
    serializer_class = ChapteredDocumentSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return get_object_or_404(ChapteredDocument, kind='youth_politics')
