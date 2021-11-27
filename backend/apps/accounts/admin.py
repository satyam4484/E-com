from django.contrib import admin
from .models import address
# Register your models here.
@admin.register(address)
class Addressadmin(admin.ModelAdmin):
    list_display = ('id','user','city','pincode','state','full_address','contact_details')