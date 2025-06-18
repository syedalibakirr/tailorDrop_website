from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ClothingType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class AlterationType(models.Model):
    name = models.CharField(max_length=100)
    clothing_type = models.ForeignKey(ClothingType, on_delete=models.CASCADE, related_name='alteration_types')
    base_price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True)
    estimated_time_hours = models.IntegerField(default=48, help_text="Estimated completion time in hours")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['name', 'clothing_type']

    def __str__(self):
        return f"{self.clothing_type.name} - {self.name}"

class AlterationRequest(models.Model):
    STATUS_CHOICES = [
        ('pending_pickup', 'Pending Pickup'),
        ('in_alteration', 'In Alteration'),
        ('out_for_delivery', 'Out for Delivery'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    PRIORITY_CHOICES = [
        ('standard', 'Standard (2-3 days)'),
        ('express', 'Express (Next day)'),
        ('rush', 'Rush (Same day)'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='alteration_requests')
    clothing_type = models.ForeignKey(ClothingType, on_delete=models.CASCADE)
    alteration_type = models.ForeignKey(AlterationType, on_delete=models.CASCADE)
    custom_instructions = models.TextField(blank=True)
    
    # Pickup details
    pickup_date = models.DateField()
    pickup_time_start = models.TimeField()
    pickup_time_end = models.TimeField()
    pickup_address = models.TextField()
    
    # Pricing and status
    estimated_price = models.DecimalField(max_digits=8, decimal_places=2)
    final_price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='standard')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending_pickup')
    
    # Tracking
    tracking_number = models.CharField(max_length=50, unique=True)
    estimated_completion = models.DateTimeField(null=True, blank=True)
    actual_completion = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.tracking_number} - {self.user.get_full_name()}"

    def save(self, *args, **kwargs):
        if not self.tracking_number:
            import uuid
            self.tracking_number = f"TD-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

class AlterationPhoto(models.Model):
    PHOTO_TYPES = [
        ('before_front', 'Before - Front'),
        ('before_back', 'Before - Back'),
        ('before_detail', 'Before - Detail'),
        ('after_front', 'After - Front'),
        ('after_back', 'After - Back'),
        ('after_detail', 'After - Detail'),
        ('customer_upload', 'Customer Upload'),
    ]

    alteration_request = models.ForeignKey(AlterationRequest, on_delete=models.CASCADE, related_name='photos')
    photo = models.ImageField(upload_to='alteration_photos/')
    photo_type = models.CharField(max_length=20, choices=PHOTO_TYPES)
    description = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.alteration_request.tracking_number} - {self.get_photo_type_display()}"

class AlterationNote(models.Model):
    alteration_request = models.ForeignKey(AlterationRequest, on_delete=models.CASCADE, related_name='notes')
    note = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_internal = models.BooleanField(default=False, help_text="Internal notes not visible to customer")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Note for {self.alteration_request.tracking_number}"