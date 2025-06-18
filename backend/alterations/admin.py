from django.contrib import admin
from .models import ClothingType, AlterationType, AlterationRequest, AlterationPhoto, AlterationNote

class AlterationTypeInline(admin.TabularInline):
    model = AlterationType
    extra = 1

@admin.register(ClothingType)
class ClothingTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
    search_fields = ['name']
    inlines = [AlterationTypeInline]

@admin.register(AlterationType)
class AlterationTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'clothing_type', 'base_price', 'estimated_time_hours']
    list_filter = ['clothing_type', 'base_price']
    search_fields = ['name', 'clothing_type__name']

class AlterationPhotoInline(admin.TabularInline):
    model = AlterationPhoto
    extra = 0
    readonly_fields = ['uploaded_at']

class AlterationNoteInline(admin.TabularInline):
    model = AlterationNote
    extra = 0
    readonly_fields = ['created_at']

@admin.register(AlterationRequest)
class AlterationRequestAdmin(admin.ModelAdmin):
    list_display = ['tracking_number', 'user', 'clothing_type', 'alteration_type', 'status', 'priority', 'created_at']
    list_filter = ['status', 'priority', 'clothing_type', 'created_at']
    search_fields = ['tracking_number', 'user__email', 'user__first_name', 'user__last_name']
    readonly_fields = ['tracking_number', 'created_at', 'updated_at']
    inlines = [AlterationPhotoInline, AlterationNoteInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('tracking_number', 'user', 'clothing_type', 'alteration_type', 'custom_instructions')
        }),
        ('Pickup Details', {
            'fields': ('pickup_date', 'pickup_time_start', 'pickup_time_end', 'pickup_address')
        }),
        ('Pricing & Priority', {
            'fields': ('estimated_price', 'final_price', 'priority')
        }),
        ('Status & Tracking', {
            'fields': ('status', 'estimated_completion', 'actual_completion')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )