from rest_framework import serializers

from apps.common.serializers import absolute_url

from .models import Person, PersonSocial


class PersonSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonSocial
        fields = ('platform', 'href')


class PersonContactSerializer(serializers.Serializer):
    phone = serializers.CharField()
    email = serializers.CharField()


class PersonSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()
    contact = serializers.SerializerMethodField()
    social = PersonSocialSerializer(many=True, read_only=True)
    department = serializers.SlugRelatedField(slug_field='name', read_only=True)
    description = serializers.SerializerMethodField()
    description_blocks = serializers.JSONField(read_only=True)

    class Meta:
        model = Person
        fields = (
            'id', 'slug', 'fullname', 'position', 'department',
            'schedule', 'address', 'contact', 'social', 'description',
            'description_blocks', 'img', 'group',
        )

    def get_img(self, obj):
        return absolute_url(self.context.get('request'), obj.resolved_image)

    def get_contact(self, obj):
        return {'phone': obj.phone, 'email': obj.email}

    def get_description(self, obj):
        # Frontend uses simple text — join paragraphs.
        parts = [b['text'] for b in (obj.description_blocks or []) if b.get('type') == 'paragraph']
        return ' '.join(parts) if parts else ''
