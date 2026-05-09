from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Video, VideoCategory
from .serializers import VideoCategorySerializer, VideoSerializer


class VideoCategoryListView(generics.ListAPIView):
    queryset = VideoCategory.objects.all().order_by('order', 'id')
    serializer_class = VideoCategorySerializer
    pagination_class = None
    permission_classes = [AllowAny]


class VideoListView(generics.ListAPIView):
    serializer_class = VideoSerializer
    pagination_class = None
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = Video.objects.filter(is_published=True).select_related('category')
        category = self.request.query_params.get('category')
        if category and category != 'all':
            qs = qs.filter(category__value=category)
        return qs.order_by('-date')
