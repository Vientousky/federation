from rest_framework import routers
from .api import BoxeadorViewSet

router = routers.DefaultRouter()

router.register('api/boxeador', BoxeadorViewSet, 'boxeador')

urlpatterns = router.urls