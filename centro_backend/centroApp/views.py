from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer,ProductSerializer,ResetPasswordRequestSerializer,ResetPasswordSerializer
from .models import User,Product,PasswordReset
import jwt, datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import generics,status
from rest_framework.permissions import AllowAny
import os

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings



# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.now(datetime.UTC)
        }

        # Removed .decode('utf-8') since jwt.encode returns str in pyjwt >= 2.0
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        # Set the token as a string in the cookie and response data
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {'jwt': token}
        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            # Specify the algorithm(s) used for decoding
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            response = Response()
            response.delete_cookie('jwt')
            response.data = {
                'message': 'success'
            }
            return response
        except Exception as e:
            return Response(status=400, data={"detail": str(e)})
 
#Add/View Products   
class ProductView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self,request, *args, **kwargs):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def get(self,request):
        products = Product.objects.all()
        serializer = ProductSerializer(products,many=True)
        return Response(serializer.data)
    
#Delete,Update and view individual product
class IndividualProductView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request,pk):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    
    def delete(self,request,pk):
        product = Product.objects.get(id=pk)
        product.delete()
        return Response('Product deleted successfully')
    
    def put(self,request,pk):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(instance=product,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

#Search Products
class SearchProductView(APIView):
    def get(self,request):
        products = Product.objects.filter(name__contains=request.data['name'])
        serializer = ProductSerializer(products,many=True)
        return Response(serializer.data)

class RequestPasswordReset(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ResetPasswordRequestSerializer

  
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email__iexact=email).first()

            if user:
                token_generator = PasswordResetTokenGenerator()
                token = token_generator.make_token(user)
                reset = PasswordReset(email=email, token=token)
                reset.save()

                reset_url = f"{settings.PASSWORD_RESET_BASE_URL}?{token}"
                subject = "Reset Password"
                html_content = render_to_string('forgetpass_email.html', {
                    'fname': "Aayush", 'lname': "Tim", 'email': email, 'code': reset_url})
                from_email = 'xayush.tc@gmail.com'
                to = [email]

                text_content = strip_tags(html_content)
                email_message = EmailMultiAlternatives(
                    subject,
                    text_content,
                    from_email,
                    to,
                )
                email_message.attach_alternative(html_content, "text/html")
                email_message.send(fail_silently=False)

                return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User with credentials not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPassword(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        
        new_password = data['new_password']
        confirm_password = data['confirm_password']
        token = data['token']
        
        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=400)
        
        reset_obj = PasswordReset.objects.filter(token=token).first()
        
        if not reset_obj:
            return Response({'error':'Invalid token'}, status=400)
        
        user = User.objects.filter(email=reset_obj.email).first()
        
        if user:
            user.set_password(request.data['new_password'])
            user.save()
            
            reset_obj.delete()
            
            return Response({'success':'Password updated'})
        else: 
            return Response({'error':'No user found'}, status=404)