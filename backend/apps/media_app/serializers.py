from rest_framework import serializers

from .models import Video, VideoCategory


class VideoCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoCategory
        fields = ('value', 'label')


class VideoSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='code')
    youtubeId = serializers.CharField(source='youtube_id')
    youtubeUrl = serializers.CharField(source='youtube_url')
    category = serializers.SlugRelatedField(slug_field='value', read_only=True)
    categoryLabel = serializers.CharField(source='category.label', default='', read_only=True)
    views = serializers.CharField(source='views_label')
    featured = serializers.BooleanField(source='is_featured')

    class Meta:
        model = Video
        fields = (
            'id', 'youtubeId', 'youtubeUrl', 'title', 'subtitle',
            'category', 'categoryLabel', 'duration', 'views', 'date', 'featured',
        )
