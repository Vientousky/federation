from django.urls import path
from .views import BusquedaAPIView

urlpatterns = [
    path('api/busqueda/', BusquedaAPIView.as_view(), name='busqueda_api'),
]