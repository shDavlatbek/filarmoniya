from django.contrib import admin

from .models import Document, OpenDataItem, PressRelease


class _DocAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'date', 'document_number', 'format', 'size', 'is_published')
    list_filter = ('type', 'format', 'is_published')
    list_editable = ('is_published',)
    search_fields = ('title', 'document_number')
    fields = (
        'title', 'type', 'date', 'document_number',
        'file', 'external_url', 'size', 'format',
        'is_published', 'order',
    )


@admin.register(Document)
class DocumentAdmin(_DocAdmin):
    pass


@admin.register(OpenDataItem)
class OpenDataItemAdmin(_DocAdmin):
    pass


@admin.register(PressRelease)
class PressReleaseAdmin(_DocAdmin):
    pass
