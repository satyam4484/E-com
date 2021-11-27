from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class address(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    state = models.CharField(max_length=100)
    full_address = models.CharField(max_length=1000)
    contact_details = models.CharField(max_length=13)

    def __str__(self) -> str:
        return f'{self.user} {self.city} {self.pincode}'
        