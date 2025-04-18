from rest_framework import serializers
from .models import Boxeador

class BoxeadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boxeador
        fields = '__all__'
  