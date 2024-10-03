import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import CommentSerializer, SavedItemSerializer, TransactionSerializer, UserSerializer,ProductSerializer,\
    ResetPasswordRequestSerializer,\
    ResetPasswordSerializer,LocationSerializer,UserProductIdSerializer

from .models import PremiumMembership, SavedItem, Transaction, User,Product,PasswordReset,UserLocation,Comment
import jwt, datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics, permissions

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import generics,status
from rest_framework.permissions import AllowAny
import os

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import math

import requests
import json
from datetime import datetime, timedelta
from django.utils import timezone
from django.db.models import Q


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        # Generate tokens using Simple JWT
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response = Response()
        response.set_cookie(key='access', value=access_token, httponly=True)
        response.set_cookie(key='refresh', value=refresh_token, httponly=True)
        response.data = {
            'access': access_token,
            'refresh': refresh_token
        }
        return response


class UserView(APIView):
    permission_classes = [IsAuthenticated]
  
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
    permission_classes = (IsAuthenticated,)
   
    def get(self, request, pk):
        try:
            product = Product.objects.get(id=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            product = Product.objects.get(id=pk)

            # Check if the requesting user is the seller of the product
            if product.userName != request.user:
                return Response({"error": "You do not have permission to delete this product."}, status=status.HTTP_403_FORBIDDEN)

            # Delete the product
            product.delete()
            return Response({'message': 'Product deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        try:
            product = Product.objects.get(id=pk)

            # Check if the requesting user is the seller of the product
            if product.userName != request.user:
                return Response({"error": "You do not have permission to update this product."}, status=status.HTTP_403_FORBIDDEN)

            serializer = ProductSerializer(instance=product, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

#Search Products
class SearchProductView(APIView):
     permission_classes = (IsAuthenticated,)

     def get(self, request):
        # Get the search query from the request
        search_query = request.query_params.get('q', None)
        
        if search_query:
            # Perform filtering using Q objects
            products = Product.objects.filter(
                Q(name__icontains=search_query) | Q(category__icontains=search_query)
            )
        else:
            products = Product.objects.all()

        # Serialize the filtered products
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
        

def calculate_cosine_similarity(vector1, vector2):
    v1 = np.array(vector1)
    v2 = np.array(vector2)
    
    dot_product = np.dot(v1, v2)
    
    # Calculate the magnitude (Euclidean norm) of each vector
    magnitude_v1 = np.linalg.norm(v1)
    magnitude_v2 = np.linalg.norm(v2)
    
    # To avoid division by zero
    epsilon = 1e-10
    
    return dot_product / (magnitude_v1 * magnitude_v2 + epsilon)

def text_to_vector(texts):
    vectorizer = TfidfVectorizer()
    return vectorizer.fit_transform(texts)

class SimilarityAPIView(APIView):

    def get(self, request, product_id, format=None):
        try:
            target_product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        products = Product.objects.exclude(id=product_id)  # Exclude the target product itself
        if products.count() < 1:
            return Response({"message": "No other products to calculate similarity"}, status=status.HTTP_400_BAD_REQUEST)

        # Include product name and category for comparison
        product_list = [f"{p.name} {p.category}" for p in products]

        # Add the target product to the list for vector comparison
        target_product_text = f"{target_product.name} {target_product.category}"
        product_list.append(target_product_text)

        # Convert product descriptions to vectors using TF-IDF
        vectors = text_to_vector(product_list).toarray()  # Convert sparse matrix to dense numpy array

        target_vector = vectors[-1]

        # Calculate cosine similarity manually for each product
        similarity_scores = []
        for vector in vectors[:-1]:  # Exclude the target product itself
            similarity_scores.append(calculate_cosine_similarity(target_vector, vector))

        similar_products = []
        for i, product in enumerate(products):
            similarity_score = similarity_scores[i]
            if similarity_score >= 0.10:
                product_data = {
                    "product_id": product.id,
                    "name": product.name,
                    "description": product.description,
                    "price": product.price,
                    "image": product.image.url if product.image else None,
                    "condition": product.condition,
                    "category": product.category,
                    "similarity_score": similarity_score
                }
                similar_products.append(product_data)

        similar_products = sorted(similar_products, key=lambda x: x["similarity_score"], reverse=True)[:5]

        response_data = {
            "product_id": target_product.id,
            "similar_products": similar_products
        }

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
        serializer = UserProductIdSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data.get('id')
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

            # Extract the product's location field
            try:
                product_location = product.location
                product_lat, product_lon = map(float, product_location.split(","))
            except (ValueError, AttributeError):
                return Response({"error": "Invalid product location format."}, status=status.HTTP_400_BAD_REQUEST)

            # Extract the user's provided latitude and longitude from the request body
            provided_lat = request.data.get('latitude')
            provided_lon = request.data.get('longitude')

            if provided_lat is None or provided_lon is None:
                return Response({"error": "User-provided latitude and longitude are required."}, status=status.HTTP_400_BAD_REQUEST)

            try:
                # Convert provided values to float
                provided_lat = float(provided_lat)
                provided_lon = float(provided_lon)
            except ValueError:
                return Response({"error": "Invalid latitude or longitude format."}, status=status.HTTP_400_BAD_REQUEST)

            midpoint = find_midpoint(provided_lat, provided_lon, product_lat, product_lon)

            return Response({
                "midpoint_latitude": midpoint[0],
                "midpoint_longitude": midpoint[1],
                "product_latitude": product_lat,
                "product_longitude": product_lon,
                "user_latitude": provided_lat,
                "user_longitude": provided_lon
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return Comment.objects.filter(product__id=product_id)

    def perform_create(self, serializer):
        product_id = self.kwargs['product_id']
        product = Product.objects.get(id=product_id)  # Get the product instance
        serializer.save(user=self.request.user, product=product)  # Pass both user and product


class PurchaseView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, product_id):
        product = Product.objects.get(id=product_id)
        quantity = int(request.data.get('quantity'))
        
        try:
            product.reduce_stock(quantity)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        total_price = product.price * quantity
        transaction = Transaction.objects.create(
            user=request.user,
            product=product,
            quantity=quantity,
            total_price=total_price
        )

        return Response({'message': 'Purchase successful', 'transaction_id': transaction.id}, status=status.HTTP_201_CREATED)

class TransactionHistoryView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)
    
class SavedItemView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the list of saved items for the logged-in user
        saved_items = SavedItem.objects.filter(user=request.user)
        serializer = SavedItemSerializer(saved_items, many=True)
        return Response(serializer.data)

    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        if SavedItem.objects.filter(user=request.user, product=product).exists():
            return Response({"message": "Product already in saved items"}, status=status.HTTP_400_BAD_REQUEST)

        saved_item = SavedItem.objects.create(user=request.user, product=product)
        serializer = SavedItemSerializer(saved_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def delete(self, request, product_id):
        # Check if the product is saved by the user
        try:
            saved_item = SavedItem.objects.get(user=request.user, product_id=product_id)
        except SavedItem.DoesNotExist:
            return Response({"error": "Saved product not found"}, status=status.HTTP_404_NOT_FOUND)

        
        saved_item.delete()
        return Response({"message": "Product removed from saved items"}, status=status.HTTP_204_NO_CONTENT)

class PurchasePremiumMembershipView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        subPaisa = 100000
        pxid = str(uuid.uuid4())
        return_url = "Payment-validate/"
        # Khalti payment initiation logic
        url = "https://a.khalti.com/api/v2/epayment/initiate/"

        payload = json.dumps({
            "return_url": "http://localhost:5173/"+return_url,
            "website_url": "http://127.0.0.0:8000",
            "amount": subPaisa,
            "purchase_order_id": pxid,
            "purchase_order_name": "Membership",
            "customer_info": {
            "name": user.firstname,
            "email": user.email,
            "phone": "9800000001"
            }
        })
        headers = {
            'Authorization': 'key 07b52c0f30dc425ea9c53fd77e798e9d',
            'Content-Type': 'application/json',
}
        response = requests.post(url, headers=headers, data=payload)
        new_res = json.loads(response.text)
        print(new_res)
        if response.status_code == 200:
            # Create or update the premium membership
            membership, created = PremiumMembership.objects.get_or_create(user=user)

            # Set the expiration date for the membership if it was created
            if created:
                print("Membership created")
                membership.expiration_date = datetime.now() + timedelta(days=30)  # Membership valid for 30 days
                membership.payment_id = new_res['pidx']  # Save the payment ID if needed
                membership.is_purchased = True
            else:
                print("Membership already exists")
                # Optionally update the expiration date if you want to renew
                membership.payment_id = new_res['pidx']
                membership.expiration_date = datetime.now() + timedelta(days=30)  # Renew for another 30 days
            print("Payment URL:", new_res['payment_url'])
            membership.save()

            
            return Response({'payment_url': new_res['payment_url']}, status=200)
        else:
            return Response({'error': 'Payment initiation failed'}, status=response.status_code)
        
class PremiumMembershipSuccessView(APIView):
    def get(self, request,pidx,status):
        user = request.user
        
        url = "https://a.khalti.com/api/v2/epayment/lookup/"
    
        headers = {
            'Authorization': 'key 07b52c0f30dc425ea9c53fd77e798e9d',
            'Content-Type': 'application/json',
        }
        
        payload = json.dumps({
            "pidx": pidx
        })
        
        response = requests.request("POST", url, headers=headers, data=payload)

        print(response.text)
        
        new_res = json.loads(response.text)
        print(new_res)

        membership = PremiumMembership.objects.get(user=user)
        if status == "Completed" and membership.payment_id == pidx:
            membership.is_purchased = True
            membership.save()

            return Response({'status': 'Payment successful. Membership activated!'}, status=200)
        else:
            return Response({'error': 'Payment not completed.'}, status=400)

class TrendingProductView(APIView):
    def get(self, request):
        # Find users with active premium membership
        active_premium_users = PremiumMembership.objects.filter(
            is_purchased=True,
            expiration_date__gt=timezone.now()
        ).values_list('user', flat=True)

        # Filter products added by users with an active premium membership
        trending_products = Product.objects.filter(
            userName__in=active_premium_users
        ).order_by('?')[:10]

        # Serialize the trending products
        serializer = ProductSerializer(trending_products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserProductListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filter products by the logged-in user
        user = request.user
        products = Product.objects.filter(userName=user)

        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data, status=200)
    
class UserProductDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(id=pk)

            if product.userName != request.user:
                return Response({"error": "You do not have permission to delete this product."}, status=status.HTTP_403_FORBIDDEN)
            
            product.delete()
            return Response({'message': 'Product deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()

        return Response({"message": "Your account has been successfully deleted."}, status=status.HTTP_200_OK)