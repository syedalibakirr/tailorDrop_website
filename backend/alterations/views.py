from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import ClothingType, AlterationType, AlterationRequest
from .serializers import (
    ClothingTypeSerializer, AlterationTypeSerializer, 
    AlterationRequestSerializer, AlterationRequestCreateSerializer
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def clothing_types_view(request):
    clothing_types = ClothingType.objects.all()
    serializer = ClothingTypeSerializer(clothing_types, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def alteration_types_view(request):
    clothing_type_id = request.GET.get('clothing_type')
    if clothing_type_id:
        alteration_types = AlterationType.objects.filter(clothing_type_id=clothing_type_id)
    else:
        alteration_types = AlterationType.objects.all()
    
    serializer = AlterationTypeSerializer(alteration_types, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_alteration_request_view(request):
    serializer = AlterationRequestCreateSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        alteration_request = serializer.save()
        response_serializer = AlterationRequestSerializer(alteration_request)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_alteration_requests_view(request):
    alteration_requests = AlterationRequest.objects.filter(user=request.user)
    serializer = AlterationRequestSerializer(alteration_requests, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def alteration_request_detail_view(request, tracking_number):
    alteration_request = get_object_or_404(
        AlterationRequest, 
        tracking_number=tracking_number, 
        user=request.user
    )
    serializer = AlterationRequestSerializer(alteration_request)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pricing_estimate_view(request):
    alteration_type_id = request.GET.get('alteration_type')
    priority = request.GET.get('priority', 'standard')
    
    if not alteration_type_id:
        return Response({'error': 'alteration_type is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        alteration_type = AlterationType.objects.get(id=alteration_type_id)
        base_price = alteration_type.base_price
        
        if priority == 'express':
            estimated_price = base_price * 1.5
        elif priority == 'rush':
            estimated_price = base_price * 2
        else:
            estimated_price = base_price
            
        return Response({
            'base_price': base_price,
            'estimated_price': estimated_price,
            'priority': priority,
            'alteration_type': alteration_type.name
        })
    except AlterationType.DoesNotExist:
        return Response({'error': 'Alteration type not found'}, status=status.HTTP_404_NOT_FOUND)