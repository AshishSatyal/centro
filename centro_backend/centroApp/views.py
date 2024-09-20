from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer,ProductSerializer,ResetPasswordRequestSerializer,ResetPasswordSerializer,LocationSerializer
from .models import User,Product,PasswordReset,UserLocation
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

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import math

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
    # permission_classes = (IsAuthenticated,)
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
    # permission_classes = (IsAuthenticated,)
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
     permission_classes = (IsAuthenticated,)
def get(self, request):
       product_name = request.query_params.get('name', '')  # Retrieve the 'name' parameter from the query string
       products = Product.objects.filter(name__icontains=product_name)  # Use 'icontains' for case-insensitive matching
       serializer = ProductSerializer(products, many=True)
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
        
# def calculate_cosine_similarity(vector1, vector2):
#     return cosine_similarity([vector1], [vector2])[0][0]

def text_to_vector(texts):
    vectorizer = TfidfVectorizer()
    return vectorizer.fit_transform(texts)

class SimilarityAPIView(APIView):

    def get(self, request, format=None):
        products = Product.objects.all()
        if products.count() < 2:
            return Response({"message": "Not enough products to calculate similarity"}, status=status.HTTP_400_BAD_REQUEST)

        product_list = [f"{p.name} {p.description} {p.condition}" for p in products]

        vectors = text_to_vector(product_list)

        # Calculate cosine similarity matrix
        similarity_matrix = cosine_similarity(vectors)
        response_data = []

        for i, product in enumerate(products):
            similar_products = []
            for j, other_product in enumerate(products):
                if i != j:
                    similar_products.append({
                        "product_id": other_product.id,
                        "similarity_score": similarity_matrix[i][j]
                    })
            similar_products = sorted(similar_products, key=lambda x: x["similarity_score"], reverse=True)[:5]
            
            response_data.append({
                "product_id": product.id,
                "similar_products": similar_products
            })

        return Response(response_data, status=status.HTTP_200_OK)
    
def find_midpoint(lat1, lon1, lat2, lon2):
    # Convert degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    
    # Convert latitude and longitude to Cartesian coordinates
    x1 = math.cos(lat1) * math.cos(lon1)
    y1 = math.cos(lat1) * math.sin(lon1)
    z1 = math.sin(lat1)

    x2 = math.cos(lat2) * math.cos(lon2)
    y2 = math.cos(lat2) * math.sin(lon2)
    z2 = math.sin(lat2)

    # Average the Cartesian coordinates
    x_avg = (x1 + x2) / 2
    y_avg = (y1 + y2) / 2
    z_avg = (z1 + z2) / 2

    # Convert Cartesian coordinates back to latitude and longitude
    hyp = math.sqrt(x_avg**2 + y_avg**2)
    lat_avg = math.atan2(z_avg, hyp)
    lon_avg = math.atan2(y_avg, x_avg)

    # Convert radians to degrees
    lat_avg = math.degrees(lat_avg)
    lon_avg = math.degrees(lon_avg)

    return lat_avg, lon_avg

class MidpointView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # Get the currently logged-in user's location
        try:
            user_location = UserLocation.objects.get(user_id=request.user)
        except UserLocation.DoesNotExist:
            return Response({"error": "User location not found."}, status=status.HTTP_404_NOT_FOUND)

        # Validate and extract location from the POST request
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            provided_lat = serializer.validated_data['latitude']
            provided_lon = serializer.validated_data['longitude']

            # Extract user's latitude and longitude
            user_lat = user_location.latitude
            user_lon = user_location.longitude

            # Calculate the midpoint
            midpoint = find_midpoint(user_lat, user_lon, provided_lat, provided_lon)

            return Response({
                "user_lat":user_lat,
                "user_lon":user_lon,
                "midpoint_latitude": midpoint[0],
                "midpoint_longitude": midpoint[1]
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class MidpointView(APIView):
#     def get(self, request, format=None):
#         # Fetch all locations from the UserLocation model
#         locations = UserLocation.objects.all()

#         # Check if we have exactly 2 locations
#         if locations.count() != 2:
#             return Response({"error": "Exactly two locations are required."}, status=status.HTTP_400_BAD_REQUEST)

#         # Extract latitude and longitude from the fetched locations
#         location_list = locations.values('latitude', 'longitude')
#         lat1, lon1 = location_list[0]['latitude'], location_list[0]['longitude']
#         lat2, lon2 = location_list[1]['latitude'], location_list[1]['longitude']

#         # Calculate the midpoint
#         midpoint = find_midpoint(lat1, lon1, lat2, lon2)

#         return Response({
#             "locations": location_list,
#             "midpoint_latitude": midpoint[0],
#             "midpoint_longitude": midpoint[1]
#         })