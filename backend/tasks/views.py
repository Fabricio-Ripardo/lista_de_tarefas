from rest_framework import viewsets

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """CRUD completo de tarefas: list, create, retrieve, update, partial_update, destroy."""

    queryset = Task.objects.all().order_by("id")
    serializer_class = TaskSerializer
