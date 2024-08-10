from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView,ProductView,IndividualProductView,SearchProductView,RequestPasswordReset,ResetPassword,SimilarityAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('Product/', ProductView.as_view()),
    path('selectedProduct/<str:pk>', IndividualProductView.as_view()),
    path('searchProduct/', SearchProductView.as_view()),
    path('requestReset/', RequestPasswordReset.as_view()),
    path('resetPassword/', ResetPassword.as_view()),
    path('similarity/', SimilarityAPIView.as_view()),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]