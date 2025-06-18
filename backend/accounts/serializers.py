from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, UserAddress, UserMeasurements

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['street', 'city', 'state', 'zip_code']

class UserMeasurementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMeasurements
        fields = ['waist', 'inseam', 'height', 'chest', 'hips', 'shoulders']

class UserSerializer(serializers.ModelSerializer):
    address = UserAddressSerializer(required=False)
    measurements = UserMeasurementsSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 'address', 'measurements']
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        address_data = validated_data.pop('address', None)
        measurements_data = validated_data.pop('measurements', None)

        # Update user fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update or create address
        if address_data:
            UserAddress.objects.update_or_create(
                user=instance,
                defaults=address_data
            )

        # Update or create measurements
        if measurements_data:
            UserMeasurements.objects.update_or_create(
                user=instance,
                defaults=measurements_data
            )

        return instance

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    address = UserAddressSerializer(required=False)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'phone', 'password', 'confirm_password', 'address']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        address_data = validated_data.pop('address', None)
        
        # Create username from email
        validated_data['username'] = validated_data['email']
        
        user = User.objects.create_user(**validated_data)
        
        # Create address if provided
        if address_data:
            UserAddress.objects.create(user=user, **address_data)
            
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError('Invalid email or password')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Must include email and password')