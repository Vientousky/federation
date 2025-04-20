from django.contrib import admin
from .models import Boxeador

@admin.register(Boxeador)
class BoxeadorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'imagen_preview')

    def imagen_preview(self, obj):
        return f'<img src="{obj.imagen.url}" width="100" />'
    imagen_preview.allow_tags = True
    imagen_preview.short_description = "Preview"
