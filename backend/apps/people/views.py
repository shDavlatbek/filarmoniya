from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Person
from .serializers import PersonSerializer


class _BasePersonListView(generics.ListAPIView):
    serializer_class = PersonSerializer
    pagination_class = None
    permission_classes = [AllowAny]
    group: str = ''

    def get_queryset(self):
        return Person.objects.filter(
            is_published=True, group=self.group,
        ).select_related('department').prefetch_related('social').order_by('order', 'id')


class ManagementListView(_BasePersonListView):
    group = 'management'


class ManagementDetailView(generics.RetrieveAPIView):
    serializer_class = PersonSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return Person.objects.filter(is_published=True, group='management')


class CentralApparatusListView(_BasePersonListView):
    group = 'central_apparatus'


class CentralApparatusDetailView(generics.RetrieveAPIView):
    serializer_class = PersonSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return Person.objects.filter(is_published=True, group='central_apparatus')
