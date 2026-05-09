from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Competition, IntlConcert, Memorandum
from .serializers import (
    CompetitionSerializer, IntlConcertSerializer, MemorandumSerializer,
)


class MemorandumListView(generics.ListAPIView):
    queryset = Memorandum.objects.filter(is_published=True).order_by('-signed_at')
    serializer_class = MemorandumSerializer
    pagination_class = None
    permission_classes = [AllowAny]


class IntlConcertListView(generics.ListAPIView):
    queryset = IntlConcert.objects.filter(is_published=True).order_by('-date')
    serializer_class = IntlConcertSerializer
    pagination_class = None
    permission_classes = [AllowAny]


class CompetitionListView(generics.ListAPIView):
    queryset = Competition.objects.filter(is_published=True).prefetch_related('laureates').order_by('-year', 'name')
    serializer_class = CompetitionSerializer
    pagination_class = None
    permission_classes = [AllowAny]
