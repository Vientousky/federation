from rest_framework import viewsets, permissions
from .models import Boxeador
from .serializers import BoxeadorSerializer

class BoxeadorViewSet(viewsets.ModelViewSet):
    queryset = Boxeador.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BoxeadorSerializer