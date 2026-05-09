from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Document, OpenDataItem, PressRelease
from .serializers import DocumentSerializer, OpenDataItemSerializer, PressReleaseSerializer


class DocumentListView(generics.ListAPIView):
    queryset = Document.objects.filter(is_published=True).order_by('-date')
    serializer_class = DocumentSerializer
    pagination_class = None
    permission_classes = [AllowAny]


class OpenDataListView(generics.ListAPIView):
    queryset = OpenDataItem.objects.filter(is_published=True).order_by('-date')
    serializer_class = OpenDataItemSerializer
    pagination_class = None
    permission_classes = [AllowAny]


class PressReleaseListView(generics.ListAPIView):
    queryset = PressRelease.objects.filter(is_published=True).order_by('-date')
    serializer_class = PressReleaseSerializer
    pagination_class = None
    permission_classes = [AllowAny]
