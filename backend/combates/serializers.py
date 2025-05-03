from rest_framework import serializers
from .models import Combates
class CombatesSerializers(serializers.ModelSerializer):

    historial = serializers.SerializerMethodField()
    ultimas_6 = serializers.SerializerMethodField()
    class Meta:
        model = Combates
        fields = '__all__'

    def get_historial(self, obj):
        return obj.historial()  # Llama al método historial de Combate

    def get_ultimas_6(self, obj):
        return obj.ultimas_6()  # Llama al método ultimas_6 de Combate    