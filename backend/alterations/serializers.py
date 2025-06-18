from rest_framework import serializers
from .models import ClothingType, AlterationType, AlterationRequest, AlterationPhoto, AlterationNote

class ClothingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothingType
        fields = ['id', 'name', 'description']

class AlterationTypeSerializer(serializers.ModelSerializer):
    clothing_type_name = serializers.CharField(source='clothing_type.name', read_only=True)
    
    class Meta:
        model = AlterationType
        fields = ['id', 'name', 'clothing_type', 'clothing_type_name', 'base_price', 'description', 'estimated_time_hours']

class AlterationPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlterationPhoto
        fields = ['id', 'photo', 'photo_type', 'description', 'uploaded_at']

class AlterationNoteSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    
    class Meta:
        model = AlterationNote
        fields = ['id', 'note', 'created_by_name', 'is_internal', 'created_at']

class AlterationRequestSerializer(serializers.ModelSerializer):
    photos = AlterationPhotoSerializer(many=True, read_only=True)
    notes = AlterationNoteSerializer(many=True, read_only=True)
    clothing_type_name = serializers.CharField(source='clothing_type.name', read_only=True)
    alteration_type_name = serializers.CharField(source='alteration_type.name', read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    
    class Meta:
        model = AlterationRequest
        fields = [
            'id', 'tracking_number', 'user', 'user_name',
            'clothing_type', 'clothing_type_name',
            'alteration_type', 'alteration_type_name',
            'custom_instructions', 'pickup_date', 'pickup_time_start', 'pickup_time_end',
            'pickup_address', 'estimated_price', 'final_price', 'priority', 'priority_display',
            'status', 'status_display', 'estimated_completion', 'actual_completion',
            'created_at', 'updated_at', 'photos', 'notes'
        ]
        read_only_fields = ['tracking_number', 'user']

class AlterationRequestCreateSerializer(serializers.ModelSerializer):
    photos = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = AlterationRequest
        fields = [
            'clothing_type', 'alteration_type', 'custom_instructions',
            'pickup_date', 'pickup_time_start', 'pickup_time_end',
            'pickup_address', 'priority', 'photos'
        ]

    def create(self, validated_data):
        photos_data = validated_data.pop('photos', [])
        user = self.context['request'].user
        
        # Calculate estimated price based on alteration type and priority
        alteration_type = validated_data['alteration_type']
        priority = validated_data.get('priority', 'standard')
        
        base_price = alteration_type.base_price
        if priority == 'express':
            estimated_price = base_price * 1.5
        elif priority == 'rush':
            estimated_price = base_price * 2
        else:
            estimated_price = base_price
            
        validated_data['estimated_price'] = estimated_price
        validated_data['user'] = user
        
        # Use user's address if no pickup address provided
        if not validated_data.get('pickup_address') and hasattr(user, 'address'):
            address = user.address
            validated_data['pickup_address'] = f"{address.street}, {address.city}, {address.state} {address.zip_code}"
        
        alteration_request = AlterationRequest.objects.create(**validated_data)
        
        # Create photo objects
        for photo in photos_data:
            AlterationPhoto.objects.create(
                alteration_request=alteration_request,
                photo=photo,
                photo_type='customer_upload'
            )
        
        return alteration_request