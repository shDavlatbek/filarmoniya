from django.contrib import admin
from django.utils.html import format_html

from .models import Team


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'short_name', 'genre', 'founded', 'is_published', 'preview')
    list_filter = ('is_published', 'genre')
    list_editable = ('is_published',)
    search_fields = ('name', 'short_name', 'directed_by')
    prepopulated_fields = {'slug': ('short_name',)}
    fieldsets = (
        (None, {'fields': ('name', 'short_name', 'slug', 'is_published', 'order')}),
        ("Tafsilotlar", {'fields': ('genre', 'founded', 'directed_by', 'members_count', 'home_stage')}),
        ("Rasm va qisqa ma'lumot", {'fields': ('image_url', 'image', 'excerpt')}),
        ("To'liq matn (richtext)", {
            'fields': ('body_html',),
            'description': "Boy redaktor: matn, sitata, rasmlar joylang.",
        }),
    )

    @admin.display(description="Rasm")
    def preview(self, obj):
        url = obj.resolved_image
        if url:
            return format_html('<img src="{}" style="height:48px;border:0;" />', url)
        return ''
