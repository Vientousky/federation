from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import BoxeadorSerializer
from .models import Boxeador
from collections import Counter
class BoxeadorViewSet(viewsets.ModelViewSet):
    queryset = Boxeador.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BoxeadorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre', 'apellido', 'licencia']

    

    @action(detail=False, methods=['get'], url_path='estadisticas')
    def total_boxeadores(self,  request):
        all = Boxeador.objects.count()
        state = Boxeador.objects.values_list('estado', flat=True)
        count = Counter(state)

        return Response({
            "total_boxeadores": all,
            "activos": count.get("Activo", 0),
            "inactivos": count.get("Inactivo", 0),
            "suspendidos": count.get("Suspendido", 0),
            "retirados": count.get("Retirado", 0),
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
