"""
Testes da API de tarefas.

Rodar:  python manage.py test
(usam SQLite em memória, então não precisam do MariaDB ligado)
"""

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Task


class TaskListCreateTests(APITestCase):
    def setUp(self):
        self.url = reverse("task-list")

    def test_lista_vazia(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), [])

    def test_lista_retorna_tarefas_ordenadas_por_id(self):
        Task.objects.create(title="Primeira")
        Task.objects.create(title="Segunda")

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual([t["title"] for t in response.json()], ["Primeira", "Segunda"])

    def test_cria_tarefa(self):
        response = self.client.post(self.url, {"title": "Estudar Django"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["title"], "Estudar Django")
        self.assertEqual(Task.objects.count(), 1)

    def test_tarefa_criada_comeca_pendente(self):
        response = self.client.post(self.url, {"title": "Nova tarefa"}, format="json")

        self.assertFalse(response.json()["completed"])

    def test_remove_espacos_do_titulo(self):
        response = self.client.post(self.url, {"title": "   Com espaços   "}, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["title"], "Com espaços")

    def test_nao_cria_tarefa_sem_titulo(self):
        response = self.client.post(self.url, {}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.json())
        self.assertEqual(Task.objects.count(), 0)

    def test_nao_cria_tarefa_com_titulo_em_branco(self):
        response = self.client.post(self.url, {"title": "   "}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Task.objects.count(), 0)

    def test_nao_cria_tarefa_com_titulo_maior_que_255(self):
        response = self.client.post(self.url, {"title": "a" * 256}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TaskDetailTests(APITestCase):
    def setUp(self):
        self.task = Task.objects.create(title="Tarefa original")
        self.url = reverse("task-detail", args=[self.task.id])

    def test_busca_tarefa_por_id(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["id"], self.task.id)

    def test_busca_tarefa_inexistente_retorna_404(self):
        response = self.client.get(reverse("task-detail", args=[9999]))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_edita_tarefa_com_put(self):
        response = self.client.put(
            self.url, {"title": "Tarefa editada", "completed": False}, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()
        self.assertEqual(self.task.title, "Tarefa editada")

    def test_conclui_tarefa_com_patch(self):
        response = self.client.patch(self.url, {"completed": True}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()
        self.assertTrue(self.task.completed)
        self.assertEqual(self.task.title, "Tarefa original")

    def test_nao_edita_para_titulo_vazio(self):
        response = self.client.patch(self.url, {"title": ""}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.task.refresh_from_db()
        self.assertEqual(self.task.title, "Tarefa original")

    def test_exclui_tarefa(self):
        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Task.objects.filter(id=self.task.id).exists())

    def test_excluir_tarefa_inexistente_retorna_404(self):
        response = self.client.delete(reverse("task-detail", args=[9999]))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
