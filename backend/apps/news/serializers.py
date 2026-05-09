from rest_framework import serializers

from apps.common.serializers import absolute_url

from .models import NewsArticle


class NewsListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    date = serializers.CharField(source='display_date')

    class Meta:
        model = NewsArticle
        fields = (
            'id', 'slug', 'title', 'excerpt',
            'date', 'published_at', 'image',
        )

    def get_image(self, obj):
        return absolute_url(self.context.get('request'), obj.resolved_image)


class NewsDetailSerializer(NewsListSerializer):
    body = serializers.SerializerMethodField()

    class Meta(NewsListSerializer.Meta):
        fields = NewsListSerializer.Meta.fields + ('body',)

    def get_body(self, obj):
        request = self.context.get('request')
        out = []
        for block in obj.body_blocks or []:
            b = dict(block)
            if b.get('type') == 'image' and b.get('src'):
                b['src'] = absolute_url(request, b['src'])
            elif b.get('type') == 'gallery':
                b['images'] = [
                    {**img, 'src': absolute_url(request, img.get('src', ''))}
                    for img in b.get('images', [])
                ]
            out.append(b)
        return out
