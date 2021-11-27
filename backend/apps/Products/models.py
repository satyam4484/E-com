from django.db import models
from django.contrib.auth.models import User
from apps.accounts.models import address


class category(models.Model):
    item_category = models.CharField(max_length=100)
    category_image = models.ImageField(upload_to='Category/')

    def __str__(self):
        return self.item_category

class sub_Category(models.Model):
    Category = models.ForeignKey(category,on_delete=models.SET_NULL,null=True)
    item_SubCategory = models.CharField(max_length=100)
    sub_category_image = models.ImageField(upload_to=f'Category/subCategory/')

    def __str__(self) -> str:
        return self.item_SubCategory

class product(models.Model):
    item_name = models.CharField(max_length=200)
    item_category = models.ForeignKey(sub_Category,on_delete=models.SET_NULL,null=True)
    item_description = models.CharField(max_length=1000)
    item_price = models.IntegerField(default=0)
    item_discount = models.FloatField(default=0,null=True,blank=True)
    created_date = models.DateTimeField(auto_now_add=True,blank=True)
    image1 = models.ImageField(upload_to=f'products/')
    image2 = models.ImageField(upload_to=f'products/',null=True,blank=True,default = 'http://127.0.0.1:8000/media/')
    image3 = models.ImageField(upload_to=f'products/',null=True,blank=True,default = 'http://127.0.0.1:8000/media/')
    vedio = models.FileField(upload_to=f'products/',blank=True,null=True,default='')

    def __str__(self):
        return self.item_name

class order_item(models.Model):
    item  = models.ForeignKey(product,on_delete=models.SET_NULL,null=True)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    quantity = models.IntegerField(default=1)
    in_cart = models.BooleanField(default=False)

    def __str__(self):
        return self.item

class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    items = models.ForeignKey(order_item,on_delete=models.SET_NULL,null=True)
    ordered_date = models.DateTimeField(auto_now_add=True)
    delivered_date = models.DateTimeField(blank=True,null=True)
    address = models.ForeignKey(address,on_delete=models.SET_NULL,null=True)
    is_delivered = models.BooleanField(default=False)
    totalAmount = models.IntegerField()
    paymentDone = models.BooleanField(default=False)

    




