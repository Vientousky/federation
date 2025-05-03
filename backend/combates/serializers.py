from rest_framework import serializers
from .models import Combates
class CombatesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Combates
        fields = '__all__'