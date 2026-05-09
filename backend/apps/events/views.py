from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Event, EventCategory
from .serializers import (
    EventCategorySerializer, EventDetailSerializer, EventListSerializer,
)


class EventCategoryListView(generics.ListAPIView):
    queryset = EventCategory.objects.all().order_by('order', 'id')
    serializer_class = EventCategorySerializer
    pagination_class = None
    permission_classes = [AllowAny]


class _BaseEventQuerysetMixin:
    def base_queryset(self):
        return Event.objects.filter(is_published=True).select_related('category')


class EventListView(_BaseEventQuerysetMixin, generics.ListAPIView):
    """All published events. Use ?category=symphony to filter."""
    serializer_class = EventListSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        qs = self.base_queryset()
        category = self.request.query_params.get('category')
        if category and category != 'all':
            qs = qs.filter(category__value=category)
        return qs.order_by('starts_at')


class EventDetailView(_BaseEventQuerysetMixin, generics.RetrieveAPIView):
    serializer_class = EventDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return self.base_queryset()


class AfishaListView(EventListView):
    """Subset of events flagged with show_in_afisha=True."""
    def get_queryset(self):
        return super().get_queryset().filter(show_in_afisha=True)


class AfishaDetailView(EventDetailView):
    """Concert detail (any event, by slug)."""
    pass
