from rest_framework import serializers
from .models import Boxeador
from entrenador.serializers import EntrenadorSerializer
class BoxeadorSerializer(serializers.ModelSerializer):
    trainer = EntrenadorSerializer(read_only=True) 
    class Meta:
        model = Boxeador
        fields = '__all__' 

    def get_combates_stats(self, obj):
        return obj.combates_stats
