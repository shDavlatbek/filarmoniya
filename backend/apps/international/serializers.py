from rest_framework import serializers

from apps.common.serializers import absolute_url

from .models import Competition, CompetitionLaureate, IntlConcert, Memorandum


class MemorandumSerializer(serializers.ModelSerializer):
    flagCode = serializers.CharField(source='flag_code', allow_blank=True, allow_null=True)
    signedAt = serializers.DateField(source='signed_at')
    validUntil = serializers.DateField(source='valid_until', allow_null=True)
    documentNumber = serializers.CharField(source='document_number')
    docUrl = serializers.SerializerMethodField()

    class Meta:
        model = Memorandum
        fields = (
            'id', 'title', 'partner', 'country', 'flagCode',
            'signedAt', 'validUntil', 'summary', 'documentNumber', 'docUrl',
        )

    def get_docUrl(self, obj):
        return absolute_url(self.context.get('request'), obj.resolved_url)


class IntlConcertSerializer(serializers.ModelSerializer):
    flagCode = serializers.CharField(source='flag_code', allow_blank=True, allow_null=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = IntlConcert
        fields = (
            'id', 'title', 'partner', 'country', 'flagCode',
            'date', 'venue', 'summary', 'image',
        )

    def get_image(self, obj):
        return absolute_url(self.context.get('request'), obj.resolved_image)


class CompetitionLaureateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompetitionLaureate
        fields = ('name', 'award')


class CompetitionSerializer(serializers.ModelSerializer):
    flagCode = serializers.CharField(source='flag_code', allow_blank=True, allow_null=True)
    laureates = CompetitionLaureateSerializer(many=True, read_only=True)

    class Meta:
        model = Competition
        fields = (
            'id', 'name', 'year', 'city', 'country', 'flagCode',
            'category', 'laureates',
        )
