from django.contrib import admin
from .models import Order, OrderStatusHistory

class OrderStatusHistoryInline(admin.TabularInline):
    model = OrderStatusHistory
    extra = 0
    readonly_fields = ['changed_at']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'user', 'total_amount', 'status', 'payment_status', 'created_at']
    list_filter = ['status', 'payment_status', 'created_at']
    search_fields = ['order_number', 'user__email', 'user__first_name', 'user__last_name']
    readonly_fields = ['order_number', 'created_at', 'updated_at']
    inlines = [OrderStatusHistoryInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('order_number', 'user', 'total_amount', 'status')
        }),
        ('Payment Information', {
            'fields': ('payment_status', 'payment_method', 'payment_transaction_id')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'completed_at'),
            'classes': ('collapse',)
        }),
    )