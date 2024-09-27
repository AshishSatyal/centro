from rest_framework import serializers
from .models import PremiumMembership, SavedItem, Transaction, User,Product,UserLocation,Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class ProductSerializer(serializers.ModelSerializer):

    user_firstname = serializers.SerializerMethodField()
    user_lastname = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = '__all__'

    def get_user_firstname(self, obj):
        return obj.userName.firstname if obj.userName else None

    def get_user_lastname(self, obj):
        return obj.userName.lastname if obj.userName else None

class ResetPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class ResetPasswordSerializer(serializers.Serializer):
    # new_password = serializers.RegexField(
    #     regex=r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
    #     write_only=True,
    #     error_messages={'invalid': ('Password must be at least 8 characters long with at least one capital letter and symbol')})
    new_password =  serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)
    token = serializers.CharField(write_only=True, required=True)
    
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        # model = UserLocation
        # fields = ['latitude', 'longitude']
        model = Product
        fields = ['id']
    
    def create(self, validated_data):
        return UserLocation.objects.create(**validated_data)
    
class UserProductIdSerializer(serializers.Serializer):
    id = serializers.IntegerField()

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = ['id', 'product', 'user', 'comment_text', 'created_at']
#         read_only_fields = ['id', 'created_at', 'user']

#     def create(self, validated_data):
#         return Comment.objects.create(**validated_data)  # Use only validated_data

class CommentSerializer(serializers.ModelSerializer):
    user_full_name = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'product', 'user_full_name', 'comment_text', 'created_at']
        read_only_fields = ['id', 'created_at', 'user_full_name']

    def get_user_full_name(self, obj):
        return obj.user.get_full_name()


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['product', 'quantity', 'total_price', 'transaction_date']

class SavedItemSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='product.name')
    image = serializers.ImageField(source='product.image', read_only=True)
    condition = serializers.ReadOnlyField(source='product.condition')
    price = serializers.ReadOnlyField(source='product.price')

    class Meta:
        model = SavedItem
        fields = ['id', 'user', 'product', 'name', 'image', 'condition', 'price', 'saved_at']
        read_only_fields = ['user', 'saved_at']

class PremiumMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = PremiumMembership
        fields = ['user', 'purchase_date', 'expiration_date']