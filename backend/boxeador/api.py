from rest_framework import viewsets, permissions, status, filters
from rest_framework.response import Response
from .models import Boxeador
from .serializers import BoxeadorSerializer

class BoxeadorViewSet(viewsets.ModelViewSet):
    queryset = Boxeador.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BoxeadorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre', 'apellido', 'numero_licencia']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
