from rest_framework import routers
from .api import BoxeadorViewSet

router = routers.DefaultRouter()
router.register(r'boxeador', BoxeadorViewSet, basename='boxeador')

urlpatterns = router.urls
