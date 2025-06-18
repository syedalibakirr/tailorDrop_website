from django.urls import path
from . import views

urlpatterns = [
    path('clothing-types/', views.clothing_types_view, name='clothing_types'),
    path('alteration-types/', views.alteration_types_view, name='alteration_types'),
    path('requests/', views.user_alteration_requests_view, name='user_alteration_requests'),
    path('requests/create/', views.create_alteration_request_view, name='create_alteration_request'),
    path('requests/<str:tracking_number>/', views.alteration_request_detail_view, name='alteration_request_detail'),
    path('pricing-estimate/', views.pricing_estimate_view, name='pricing_estimate'),
]