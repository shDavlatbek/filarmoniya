from rest_framework import serializers

from apps.common.serializers import absolute_url

from .models import Document, OpenDataItem, PressRelease


class _BaseDocSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    documentNumber = serializers.CharField(source='document_number')

    class Meta:
        fields = ('id', 'title', 'type', 'date', 'size', 'format', 'documentNumber', 'url')

    def get_url(self, obj):
        return absolute_url(self.context.get('request'), obj.resolved_url)


class DocumentSerializer(_BaseDocSerializer):
    class Meta(_BaseDocSerializer.Meta):
        model = Document


class OpenDataItemSerializer(_BaseDocSerializer):
    class Meta(_BaseDocSerializer.Meta):
        model = OpenDataItem


class PressReleaseSerializer(_BaseDocSerializer):
    class Meta(_BaseDocSerializer.Meta):
        model = PressRelease
