from django.contrib import admin
from .models import category,sub_Category,order_item,product,Order
# Register your models here.

@admin.register(category)
class categoryAdmin(admin.ModelAdmin):
    list_display = ('id','item_category','category_image')
    search_fields= ['item_category']
    
@admin.register(sub_Category)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('id','Category','item_SubCategory','sub_category_image')

@admin.register(product)
class productAdmin(admin.ModelAdmin):
    list_display=('id','item_name','item_category','item_description','item_price','item_discount','created_date','image1','image2','image3','vedio')

@admin.register(order_item)
class orderItemAdmin(admin.ModelAdmin):
    list_display=('id','item','user','quantity','in_cart')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','user','items','ordered_date','delivered_date','address','is_delivered','totalAmount','paymentDone')

