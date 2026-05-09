from rest_framework import serializers

from apps.common.serializers import absolute_url

from .models import Team


class TeamListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    shortName = serializers.CharField(source='short_name')
    directedBy = serializers.CharField(source='directed_by')
    membersCount = serializers.CharField(source='members_count')
    homeStage = serializers.CharField(source='home_stage')

    class Meta:
        model = Team
        fields = (
            'id', 'slug', 'name', 'shortName', 'genre', 'founded',
            'directedBy', 'membersCount', 'homeStage', 'image', 'excerpt',
        )

    def get_image(self, obj):
        return absolute_url(self.context.get('request'), obj.resolved_image)


class TeamDetailSerializer(TeamListSerializer):
    body = serializers.SerializerMethodField()

    class Meta(TeamListSerializer.Meta):
        fields = TeamListSerializer.Meta.fields + ('body',)

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
