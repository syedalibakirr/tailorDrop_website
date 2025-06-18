from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserAddress, UserMeasurements

class UserAddressInline(admin.StackedInline):
    model = UserAddress
    can_delete = False

class UserMeasurementsInline(admin.StackedInline):
    model = UserMeasurements
    can_delete = False

class UserAdmin(BaseUserAdmin):
    inlines = [UserAddressInline, UserMeasurementsInline]
    list_display = ['email', 'first_name', 'last_name', 'phone', 'is_active', 'date_joined']
    list_filter = ['is_active', 'is_staff', 'date_joined']
    search_fields = ['email', 'first_name', 'last_name']
    ordering = ['-date_joined']

admin.site.register(User, UserAdmin)