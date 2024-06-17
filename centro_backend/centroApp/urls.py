from django.urls import path
from . import views
from .views import RegisterUser, LoginUser

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
]