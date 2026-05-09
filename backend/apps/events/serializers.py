from rest_framework import serializers

from apps.common.serializers import absolute_url

from .models import Event, EventCategory


class EventCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCategory
        fields = ('value', 'label')


class EventListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    day = serializers.ReadOnlyField()
    month = serializers.ReadOnlyField()
    monthShort = serializers.ReadOnlyField(source='month_short')
    year = serializers.ReadOnlyField()
    time = serializers.ReadOnlyField()
    category = serializers.SlugRelatedField(slug_field='value', read_only=True)
    categoryLabel = serializers.CharField(source='category.label', default='', read_only=True)
    showInAfisha = serializers.BooleanField(source='show_in_afisha', read_only=True)

    class Meta:
        model = Event
        fields = (
            'id', 'slug', 'day', 'month', 'monthShort', 'year', 'time',
            'venue', 'category', 'categoryLabel',
            'title', 'subtitle', 'excerpt', 'image',
            'conductor', 'price', 'duration', 'starts_at',
            'showInAfisha',
        )

    def get_image(self, obj):
        return absolute_url(self.context.get('request'), obj.resolved_image)


class EventDetailSerializer(EventListSerializer):
    about = serializers.SerializerMethodField()

    class Meta(EventListSerializer.Meta):
        fields = EventListSerializer.Meta.fields + ('about',)

    def get_about(self, obj):
        # Frontend expects an array of paragraph strings (legacy), so emit text
        return [
            b['text'] for b in (obj.about_blocks or []) if b.get('type') == 'paragraph'
        ] or []
