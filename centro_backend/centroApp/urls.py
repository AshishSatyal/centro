from django.urls import path
from .views import PremiumMembershipSuccessView, PurchasePremiumMembershipView, PurchaseView, RegisterView, LoginView, SavedItemView, TransactionHistoryView, UserView,\
      LogoutView,ProductView,IndividualProductView,SearchProductView,\
        RequestPasswordReset,ResetPassword,SimilarityAPIView,MidpointView\
        ,CommentListCreateView
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
    path('selectedProduct/<int:pk>', IndividualProductView.as_view()),
    path('searchProduct/', SearchProductView.as_view()),
    path('requestReset/', RequestPasswordReset.as_view()),
    path('resetPassword/', ResetPassword.as_view()),
    path('similarity/', SimilarityAPIView.as_view()),
    path('midpointView/', MidpointView.as_view()),
    path('products/<int:product_id>/comments/', CommentListCreateView.as_view()),
    path('products/<int:product_id>/purchase/', PurchaseView.as_view()),
    path('transactions/history/', TransactionHistoryView.as_view()),
    path('products/<int:product_id>/save/', SavedItemView.as_view()),
    path('saved-items/', SavedItemView.as_view(), name='saved-items-list'),

    path('premium/membership/purchase/', PurchasePremiumMembershipView.as_view(), name='purchase_premium_membership'),
    path('premium/membership/success/<str:pidx>/<str:status>/', PremiumMembershipSuccessView.as_view(), name='membership_success'),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]