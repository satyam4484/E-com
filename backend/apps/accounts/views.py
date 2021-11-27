import re
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, parser_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
# Create your views here.


@api_view(['POST'])
def isUserExists(request):
    try:
        username = request.data['username']
        user = User.objects.filter(username=username)
        if user:
            return Response({"error":True,"message":"UserName Already Taken ","additionalMessage":"","data":""})
        return Response({"error":False,"message":"","additionalMessage":"","data":""})
    except Exception as e:
        return Response({"error":True,"message":str(e),"additionalMessage":"Error Occured in checking username","data":""})


@api_view(['POST'])
def createUser(request):
    try:
        username = request.data['username']
        password = request.data['password']
        email = request.data['email']

        user = User.objects.create(username = username,email = email)
        user.set_password(password)
        user.save()
        if User.objects.filter(username=username):
            return Response({"error":False,"message":"Account Created ! You May Login Now! ","additionalMessage":"","data":""})
        return Response({"error":True,"message":"Something went Wrong ! While creating Account. Try again!! ","additionalMessage":"","data":""})
    except Exception as e:
        return Response({"error":True,"message":str(e),"additionalMessage":"Error occured in creating user ","data":""})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    try:
        user = User.objects.filter(username=request.user).values('id','username','email','first_name','last_name','is_staff','is_active','is_superuser')
        return Response({"error":False,"message":"","additionalMessage":"","data":user[0]})

    except Exception as e:
        return Response({"error":True,"message":str(e),"additionalMessage":"Error Occured in getting user ","data":""})
