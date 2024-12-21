from rest_framework import serializers
from .models import User, Medication, RefillRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = '__all__'

class RefillRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefillRequest
        fields = '__all__'
        read_only_fields = ('user', 'requested_at')