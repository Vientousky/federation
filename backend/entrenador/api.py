from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Entrenador
from .serializers import EntrenadorSerializer

class EntrenadorViewSet(viewsets.ModelViewSet):
    queryset = Entrenador.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = EntrenadorSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
