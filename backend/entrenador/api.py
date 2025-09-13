"""
---------------------------------------------------
EntrenadorAPI

API pública para gestionar entrenadores.

🔍Funcionalidades:

-CRUB COMPLETO
-Busqueda por filtro('nombre', 'apellido', 'n_licencia')
-Permisos abiertos
-gestion de total de entrenadores y su cargo
---------------------------------------------------
"""


from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Entrenador
from .serializers import EntrenadorSerializer
from collections import Counter

TODOS_LOS_CARGOS = [
    "director_tecnico",
    "entrenador_principal",
    "preparador_fisico",
    "segundo_entrenador",
    "cutman",
    "nutricionista",
    "psicologo",
    "manager",
    "asistente_tecnico",
    "kinesiologo",
    "sparring",
    "analista",
]

class EntrenadorViewSet(viewsets.ModelViewSet):
    queryset = Entrenador.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = EntrenadorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre', 'apellido', 'n_licencia']

    @action(detail=False, methods=['get'], url_path='estadisticas')
    def all_trainers(self, request):
        total = Entrenador.objects.count()
        cargos_raw = Entrenador.objects.values_list('cargo', flat=True)
        count = Counter(
            cargo.lower().replace(" ", "_") for cargo in cargos_raw
        )

        cargo = {
            cargo: count.get(cargo, 0)
            for cargo in TODOS_LOS_CARGOS
        }

        return Response({
            'total_entrenador': total,
            'cargos': cargo
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
