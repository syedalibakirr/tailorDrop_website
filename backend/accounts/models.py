from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

class UserAddress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='address')
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} {self.zip_code}"

class UserMeasurements(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='measurements')
    waist = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Waist measurement in inches")
    inseam = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Inseam measurement in inches")
    height = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Height in inches")
    chest = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Chest measurement in inches")
    hips = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Hip measurement in inches")
    shoulders = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Shoulder measurement in inches")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Measurements for {self.user.get_full_name()}"