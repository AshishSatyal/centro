from django.db import models
from django.contrib.auth.models import AbstractUser


from django.contrib.auth.models import BaseUserManager, AbstractUser
from django.db import models

from django.utils import timezone



class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    number = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_full_name(self):
        return f"{self.firstname} {self.lastname}"
    AUTH_USER_MODEL = 'centroApp.User'

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.FloatField()
    countInStock = models.IntegerField()
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    condition = models.CharField(max_length=255)
    sold = models.BooleanField(default=False)
    userName = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def reduce_stock(self, quantity):
        if quantity > self.countInStock:
            raise ValueError("Not enough stock available")
        self.countInStock -= quantity
        self.save()

    def __str__(self):
        return self.name
    
class UserLocation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()
    
    def __str__(self):
        return self.user.email
    
class PasswordReset(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    product = models.ForeignKey(Product, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.email} on {self.product.name}"

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.FloatField()
    transaction_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} purchased {self.quantity} of {self.product.name}"
    
class SavedItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')  # Ensures the user can't save the same product multiple times

    def __str__(self):
        return f"{self.user.email} saved {self.product.name}"
    
class PremiumMembership(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)
    expiration_date = models.DateTimeField(null=True, blank=True)
    is_purchased = models.BooleanField(default=False)
    payment_id = models.CharField(max_length=255)

    def is_active(self):
        return timezone.now() < self.expiration_date
    
    def save(self, *args, **kwargs):
        if self.expiration_date:
            # Ensure expiration_date is timezone-aware if it's not
            if timezone.is_naive(self.expiration_date):
                self.expiration_date = timezone.make_aware(self.expiration_date)

            # Automatically set is_purchased to False if expiration_date has passed
            if timezone.now() >= self.expiration_date:
                self.is_purchased = False

        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Premium Member: {self.user.email}"
    