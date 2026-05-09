from rest_framework import serializers

from apps.common.serializers import absolute_url

from .models import (
    AboutMilestone, AboutPage, AboutStat,
    ChapteredDocument, DocumentAttachment,
)


class AboutStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutStat
        fields = ('value', 'label')


class AboutMilestoneSerializer(serializers.ModelSerializer):
    desc = serializers.CharField(source='description')

    class Meta:
        model = AboutMilestone
        fields = ('year', 'title', 'desc')


class AboutPageSerializer(serializers.ModelSerializer):
    hero = serializers.SerializerMethodField()
    intro = serializers.SerializerMethodField()
    stats = AboutStatSerializer(many=True, read_only=True)
    milestones = AboutMilestoneSerializer(many=True, read_only=True)
    mission = serializers.SerializerMethodField()

    class Meta:
        model = AboutPage
        fields = ('hero', 'intro', 'stats', 'milestones', 'mission')

    def get_hero(self, obj):
        request = self.context.get('request')
        url = obj.hero_image.url if obj.hero_image else obj.hero_image_url
        return {
            'eyebrow': obj.hero_eyebrow,
            'title': obj.hero_title,
            'subtitle': obj.hero_subtitle,
            'image': absolute_url(request, url),
        }

    def get_intro(self, obj):
        paragraphs = [
            b['text'] for b in (obj.intro_body_blocks or []) if b.get('type') == 'paragraph'
        ]
        return {'title': obj.intro_title, 'paragraphs': paragraphs}

    def get_mission(self, obj):
        return {'title': obj.mission_title, 'text': obj.mission_text}


class DocumentAttachmentSerializer(serializers.ModelSerializer):
    href = serializers.SerializerMethodField()

    class Meta:
        model = DocumentAttachment
        fields = ('label', 'href', 'size')

    def get_href(self, obj):
        request = self.context.get('request')
        return absolute_url(request, obj.resolved_href)


class ChapteredDocumentSerializer(serializers.ModelSerializer):
    meta = serializers.SerializerMethodField()
    chapters = serializers.JSONField(source='body_chapters', read_only=True)
    attachments = DocumentAttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = ChapteredDocument
        fields = ('meta', 'chapters', 'attachments')

    def get_meta(self, obj):
        return {
            'eyebrow': obj.eyebrow,
            'title': obj.title,
            'subtitle': obj.subtitle,
            'approvedBy': obj.approved_by,
            'publishedDate': obj.published_date.isoformat() if obj.published_date else None,
            'documentNumber': obj.document_number,
        }
