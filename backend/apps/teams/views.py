from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Team
from .serializers import TeamDetailSerializer, TeamListSerializer


class TeamListView(generics.ListAPIView):
    queryset = Team.objects.filter(is_published=True).order_by('order', 'id')
    serializer_class = TeamListSerializer
    pagination_class = None
    permission_classes = [AllowAny]


class TeamDetailView(generics.RetrieveAPIView):
    serializer_class = TeamDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return Team.objects.filter(is_published=True)
