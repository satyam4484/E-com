from django.urls import path
from .views import getUser, isUserExists,createUser,getUser
urlpatterns = [
    path('validate/',isUserExists,name='validate'),
    path('createuser/',createUser,name='createuser'),
    path('getuser/',getUser,name='getuser')
]
