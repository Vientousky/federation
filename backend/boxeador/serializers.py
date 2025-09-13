from rest_framework import serializers
from .models import Boxeador
from combates.models import Combates
from combates.serializers import CombatesSerializers
from django.db.models import Q

class BoxeadorSerializer(serializers.ModelSerializer):
    combates_stats = serializers.SerializerMethodField()
    class Meta:
        model = Boxeador
        fields = '__all__' 

    def get_combates_stats(self, obj):
        return obj.combates_stats

    def get_combates(self, instance):
        combates = Combates.objects.filter(
            Q(boxeador=instance) | Q(rival=instance)
        ).distinct().order_by("-fecha")  

        return CombatesSerializers(combates, many=True).data