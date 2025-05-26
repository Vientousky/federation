from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

class AdminOnlyPermission(IsAdminUser):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({"message": "Solo para Adminitrador."})