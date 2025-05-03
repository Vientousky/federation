from django.contrib import admin
from .models import Combates

# Register your models here.

class CombatesAdmin(admin.ModelAdmin):
    list_display= ('boxeador','rival','peso','fecha','lugar','resultados')

admin.site.register(Combates, CombatesAdmin)
