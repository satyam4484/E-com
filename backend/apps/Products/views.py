
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from .models import category,sub_Category,product
from .serializers import CategorySerializer,subCategorySerializer,productSerializer
from rest_framework.response import Response
# Create your views here.

@api_view(['GET'])
# @permission_classes([AllowAny])
def getCategory(request):
    try:
        object = category.objects.all()
        category_data = CategorySerializer(object,many=True,context={"request": request})
        return Response({"error":False,"message":"","additionalMessage":"","data":category_data.data})
    except Exception as e:
        return Response({"error":True,"message":str(e),"additionalMessage":"Error occured in getting category","data":""})

@api_view(['POST'])
def getSubCategory(request):
    try:
        categoryid = request.data['id']
        object  = sub_Category.objects.filter(Category__id = categoryid)
        subcategory = subCategorySerializer(object,many=True,context={"request": request})
        return Response({"error":False,"message":"","additionalMessage":"","data":subcategory.data})
    except Exception as e:
        return Response({"error":True,"message":str(e),"additionalMessage":"Error occured in getting Sub Category ","data":""})

@api_view(['POST'])
def getProductsList(request):
    try:
        id = request.data['id']
        objects = product.objects.filter(item_category__id = id)
        products = productSerializer(objects,many=True,context={"request": request})
        return Response({"error":False,"message":"","additionalMessage":"","data":products.data})
    except Exception as e:
        return Response({"error":True,"message":str(e),"additionalMessage":"Error occured in getting product ","data":""})

@api_view(['GET'])
def getProduct(request,id=None):
    try:
        object = product.objects.get(id = id)
        products = productSerializer(object,context={"request": request})
        return Response({"error":False,"message":"","additionalMessage":"","data":products.data})
    except Exception as e:
        return Response({"error":True,"message":str(e),"additionalMessage":"Error occured in getting product ","data":""})

@api_view(['POST'])
def getProductsByCategory(request):
    try:
        id = request.data['category']
        objects = product.objects.filter(item_category__Category__id = id).exclude(item_category__id = request.data['subcategory'] )[:10]
        products = productSerializer(objects,many=True,context={"request": request})
        return Response({"error":False,"message":"","additionalMessage":"","data":products.data})
    except Exception as e:
        return Response({"error":True,"message":str(e),"additionalMessage":"Error occured in getting products by category ","data":""})
