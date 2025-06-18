from rest_framework import serializers
from .models import Order, OrderStatusHistory
from alterations.serializers import AlterationRequestSerializer

class OrderStatusHistorySerializer(serializers.ModelSerializer):
    changed_by_name = serializers.CharField(source='changed_by.get_full_name', read_only=True)
    
    class Meta:
        model = OrderStatusHistory
        fields = ['id', 'status', 'notes', 'changed_by_name', 'changed_at']

class OrderSerializer(serializers.ModelSerializer):
    alteration_requests = AlterationRequestSerializer(many=True, read_only=True)
    status_history = OrderStatusHistorySerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'user_name', 'alteration_requests',
            'total_amount', 'status', 'status_display', 'payment_status',
            'payment_method', 'created_at', 'updated_at', 'completed_at',
            'status_history'
        ]
        read_only_fields = ['order_number', 'user']