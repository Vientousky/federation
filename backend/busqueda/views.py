# busqueda/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from boxeador.models import Boxeador
from boxeador.serializers import BoxeadorSerializer

@api_view(['GET'])
def busqueda_global(request):
    q = request.GET.get('q', '')
    boxeadores = Boxeador.objects.filter(nombre__icontains=q)[:10]
    return Response({
        "boxeadores": BoxeadorSerializer(boxeadores, many=True).data
    })
