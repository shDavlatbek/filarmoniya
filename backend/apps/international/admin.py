from django.contrib import admin
from django.utils.html import format_html

from .models import Competition, CompetitionLaureate, IntlConcert, Memorandum


@admin.register(Memorandum)
class MemorandumAdmin(admin.ModelAdmin):
    list_display = ('title', 'partner', 'country', 'signed_at', 'is_published')
    list_filter = ('country', 'is_published')
    list_editable = ('is_published',)
    search_fields = ('title', 'partner', 'country')
    fieldsets = (
        (None, {'fields': ('title', 'partner', 'country', 'flag_code')}),
        ("Sanalar", {'fields': ('signed_at', 'valid_until')}),
        ("Tafsilotlar", {'fields': ('summary', 'document_number', 'file', 'external_url')}),
        ("Holat", {'fields': ('is_published', 'order')}),
    )


@admin.register(IntlConcert)
class IntlConcertAdmin(admin.ModelAdmin):
    list_display = ('title', 'partner', 'country', 'date', 'is_published', 'preview')
    list_filter = ('country', 'is_published')
    list_editable = ('is_published',)
    search_fields = ('title', 'partner')

    @admin.display(description="Rasm")
    def preview(self, obj):
        url = obj.resolved_image
        if url:
            return format_html('<img src="{}" style="height:48px;border:0;" />', url)
        return ''


class CompetitionLaureateInline(admin.TabularInline):
    model = CompetitionLaureate
    extra = 1


@admin.register(Competition)
class CompetitionAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'city', 'country', 'category', 'is_published')
    list_filter = ('year', 'country', 'is_published')
    list_editable = ('is_published',)
    search_fields = ('name', 'city', 'country', 'category')
    inlines = [CompetitionLaureateInline]
