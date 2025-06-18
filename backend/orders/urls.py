from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_orders_view, name='user_orders'),
    path('<str:order_number>/', views.order_detail_view, name='order_detail'),
]