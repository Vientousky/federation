from rest_framework import viewsets, permissions
from rest_framework.filters import SearchFilter
from .models import Boxeador
from .serializers import BoxeadorSerializer


class BoxeadorViewSet(viewsets.ModelViewSet):
    queryset = Boxeador.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BoxeadorSerializer
    SearchFilter = ['nombre']