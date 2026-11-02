from django.db import models


class Task(models.Model):
    """Uma tarefa da lista. Campos iguais aos da migração 0001_initial."""

    project_id = models.BigIntegerField(blank=True, null=True)
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.title
