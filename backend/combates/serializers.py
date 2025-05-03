from rest_framework import serializers
from .models import Combates
class CombatesSerializers(serializers.ModelSerializer):

    historial = serializers.SerializerMethodField()
    ultimas_6 = serializers.SerializerMethodField()
    class Meta:
        model = Combates
        fields = '__all__'