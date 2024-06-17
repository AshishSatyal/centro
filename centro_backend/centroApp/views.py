from rest_framework.response import Response
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer
from django.contrib.auth.models import User

# for resticting api to authinticated user
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

#login 
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the myapp index.")

class RegisterUser(APIView):
    def post(self,request):
        serializer = UserSerializer(data = request.data)
        
        if not serializer.is_valid():
            return Response({'status':403,'errors':serializer.errors ,'message':'Something went wrong'})

        serializer.save()
        
        user = User.objects.get(username = serializer.data['username'])
        token_obj , _ = Token.objects.get_or_create(user=user)
        
        return Response({'status':200,'payload':serializer.data ,'token' : str(token_obj),'message':'User Created!'})


class LoginUser(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        }, status=status.HTTP_200_OK)
# Used to give access to authincated users only
# authentication_classes = [TokenAuthentication]
# permission_classes = [IsAuthenticated]

# while sending request to API should add in header
# Authorization  : token <token_key>