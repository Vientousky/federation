from rest_framework import viewsets, permissions
from .models import Combates
from .serializers import CombatesSerializers

class CombatesViewSet(viewsets.ModelViewSet):
    queryset = Combates.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CombatesSerializers