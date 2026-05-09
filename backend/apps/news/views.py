from rest_framework import filters, generics
from rest_framework.permissions import AllowAny

from .models import NewsArticle
from .serializers import NewsDetailSerializer, NewsListSerializer


class NewsListView(generics.ListAPIView):
    serializer_class = NewsListSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'excerpt']
    ordering_fields = ['published_at', 'created_at']
    ordering = ['-published_at']

    def get_queryset(self):
        return NewsArticle.objects.filter(is_published=True)


class NewsDetailView(generics.RetrieveAPIView):
    serializer_class = NewsDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return NewsArticle.objects.filter(is_published=True)
