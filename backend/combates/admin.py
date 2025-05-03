from django.contrib import admin

# Register your models here.

class CombatesAdmin(admin.ModelAdmin):
    list_display= ('boxeador','rival','peso','fecha','lugar','resultados' )
