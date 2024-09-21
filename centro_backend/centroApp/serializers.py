from rest_framework import serializers
from .models import User,Product,UserLocation


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

#get user id
class UserProductIdSerializer(serializers.Serializer):
    id = serializers.IntegerField()