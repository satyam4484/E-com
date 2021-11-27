import re
from rest_framework import serializers
from .models import category,sub_Category,product


class productSerializer(serializers.ModelSerializer):
    description = serializers.SerializerMethodField()
    discountPrice = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    # vedio = serializers.SerializerMethodField()
    class Meta:
        model = product
        fields =('id','item_name','description','item_price','item_discount','discountPrice','images','vedio','created_date')
    def absoluteurl(self,request,data):
        url=request.build_absolute_uri(data)
        if url == "http://127.0.0.1:8000/media/http%3A/127.0.0.1%3A8000/media/":
            return ''
        return url
    
    def get_vedio(self,product):
        request = self.context.get('request')
        video = product.vedio.url
        return self.absoluteurl(request,product.vedio.url)

    
    def get_images(self,product):
        request = self.context.get('request')
        images=[]
        images.append(self.absoluteurl(request,product.image1.url))
        images.append(self.absoluteurl(request,product.image2.url))
        images.append(self.absoluteurl(request,product.image3.url))
        return images

    def get_discountPrice(self,product):
        price = product.item_price
        discount = product.item_discount
        discountPrice = price - (price * discount//100)
        return discountPrice
    def get_description(self,product):
        description = product.item_description.split(',')+[]
        return description



class CategorySerializer(serializers.ModelSerializer):
    categoryImage = serializers.SerializerMethodField()
    class Meta:
        model = category
        fields =('id','item_category','categoryImage')

    def get_categoryImage(self,category):
        request = self.context.get('request')
        categoryImage = category.category_image.url
        return request.build_absolute_uri(categoryImage)

class subCategorySerializer(serializers.ModelSerializer):
    subCategoryImage = serializers.SerializerMethodField()
    class Meta:
        model = sub_Category
        fields=('id','item_SubCategory','subCategoryImage','Category')
    
    def get_subCategoryImage(self,sub_Category):
        request = self.context.get('request')
        subCategoryImage = sub_Category.sub_category_image.url
        return request.build_absolute_uri(subCategoryImage)