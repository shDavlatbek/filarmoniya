from django.contrib import admin
from django.utils.html import format_html

from .models import Event, EventCategory


@admin.register(EventCategory)
class EventCategoryAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'order')
    list_editable = ('order',)
    prepopulated_fields = {'value': ('label',)}


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'starts_at', 'venue', 'category',
        'show_in_afisha', 'is_published', 'preview',
    )
    list_filter = ('is_published', 'show_in_afisha', 'category', 'venue')
    list_editable = ('is_published', 'show_in_afisha')
    search_fields = ('title', 'subtitle', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'starts_at'
    fieldsets = (
        (None, {
            'fields': ('title', 'subtitle', 'slug',
                       'is_published', 'show_in_afisha', 'order'),
        }),
        ("Joy va vaqt", {'fields': ('starts_at', 'venue', 'category')}),
        ("Tafsilotlar", {
            'fields': ('excerpt', 'image_url', 'image',
                       'conductor', 'price', 'duration'),
        }),
        ("Tadbir haqida (richtext)", {
            'fields': ('about_html',),
            'description': "Tadbir haqida batafsil ma'lumot. Sayt avtomatik paragraflarga ajratadi.",
        }),
    )

    @admin.display(description="Rasm")
    def preview(self, obj):
        url = obj.resolved_image
        if url:
            return format_html('<img src="{}" style="height:48px;border:0;" />', url)
        return ''
