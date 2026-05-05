from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(code)
class codeAdmin(admin.ModelAdmin):
    list_display = ('code', 'email')
    
@admin.register(organization)
class orgAdmin(admin.ModelAdmin):
    list_display = ('region', 'fio', 'email', 'admin')
    
@admin.register(lastIvent)
class lastIventAdmin(admin.ModelAdmin):
    list_display = ('city', 'mens', 'discipline', 'title', 'format', 'date_start', 'date_end')
    
@admin.register(persona)
class personaAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'id_user', 'fio', 'phone', 'born_date', 'sex', 'country', 'region', 'city', 'user')
    
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date_start', 'date_end', 'type', 'age_group', 'verify')
    
@admin.register(OrganizationsEvents)
class OrganizationsEventsAdmin(admin.ModelAdmin):
    list_display = ('organization',)

@admin.register(authorizedToken)
class authorizedTokenAdmin(admin.ModelAdmin):
    list_display = ('key', 'user')

@admin.register(personaEvents)
class personaEventsAdmin(admin.ModelAdmin):
    list_display = ('persona',)
    
@admin.register(report)
class reportAdmin(admin.ModelAdmin):
    list_display = ('event', 'winner')
