from django.contrib import admin
from django.utils.html import format_html

from .models import Department, Person, PersonSocial


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    list_editable = ('order',)
    search_fields = ('name',)


class PersonSocialInline(admin.TabularInline):
    model = PersonSocial
    extra = 1


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'position', 'group', 'department', 'is_published', 'preview')
    list_filter = ('group', 'department', 'is_published')
    list_editable = ('is_published',)
    search_fields = ('fullname', 'position')
    prepopulated_fields = {'slug': ('fullname',)}
    inlines = [PersonSocialInline]
    fieldsets = (
        (None, {'fields': ('group', 'fullname', 'slug', 'position', 'department', 'is_published', 'order')}),
        ("Aloqa", {'fields': ('schedule', 'phone', 'email', 'address')}),
        ("Rasm", {'fields': ('image_url', 'image')}),
        ("Biografiya (richtext)", {
            'fields': ('description_html',),
            'description': "Xodim biografiyasi. Sayt avtomatik formatlaydi.",
        }),
    )

    @admin.display(description="Rasm")
    def preview(self, obj):
        url = obj.resolved_image
        if url:
            return format_html(
                '<img src="{}" style="height:48px;width:48px;object-fit:cover;border-radius:50%;" />',
                url,
            )
        return ''
