from rest_framework import routers
from .api import CombatesViewSet

router = routers.DefaultRouter()
router.register(r'combates', CombatesViewSet, basename='combates')

urlpatterns = router.urls

