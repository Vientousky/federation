from django.contrib import admin
from .models import Boxeador
from django.utils.html import mark_safe

@admin.register(Boxeador)
class BoxeadorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'imagen_preview')

    def imagen_preview(self, obj):
        if obj.foto:
            return mark_safe(f'<img src="{obj.foto.url}" width="100" />')
        return "No Image"
    imagen_preview.short_description = "Vista previa de la foto"
