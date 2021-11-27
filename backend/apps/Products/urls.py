from django.urls import path 
from .views import getCategory,getSubCategory,getProductsList,getProduct,getProductsByCategory

urlpatterns = [
    path('category/',getCategory,name='category'),
    path('subCategory/',getSubCategory,name='subCategory'),
    path('itemCategory/',getProductsByCategory,name='getProductsByCategory'),
    path('items/',getProductsList,name='items'),
    path('items/<int:id>/',getProduct,name='items'),
]
