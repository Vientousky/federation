from rest_framework import viewsets, permissions, status, filters
from rest_framework.response import Response
from .models import Entrenador
from .serializers import EntrenadorSerializer
from collections import Counter

class EntrenadorViewSet(viewsets.ModelViewSet):
    queryset = Entrenador.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = EntrenadorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre', 'apellido', 'n_licencia']

    def get(self, request):
        total = Entrenador.objects.count()
        cargos = Counter(Entrenador.objects.values_list('cargo', flat=True))

        cargos_legibles = {
            'Director Tecnico': cargos.get('DT', 0),
            'Preparador Fisico': cargos.get('PF', 0),
            'Nutricionista': cargos.get('NU', 0),
        }

        return Response({
            'total': total,
            'cargo': cargos
        })


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
