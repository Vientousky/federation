from rest_framework import serializers
from .models import Boxeador
from combates.models import Combates
from combates.serializers import CombatesSerializers
from django.db.models import Q

class BoxeadorSerializer(serializers.ModelSerializer):
    combates = serializers.SerializerMethodField()

    total_victorias = serializers.IntegerField(read_only=True)
    total_derrotas = serializers.IntegerField(read_only=True)
    total_empates = serializers.IntegerField(read_only=True)
    total_sin_decision = serializers.IntegerField(read_only=True)

    class Meta:
        model = Boxeador
        fields = '__all__' 

    def get_combates(self, instance):
        combates = Combates.objects.filter(
            Q(boxeador=instance) | Q(rival=instance)
        ).distinct().order_by("-fecha")  

        return CombatesSerializers(combates, many=True).data