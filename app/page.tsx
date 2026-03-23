"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, List, Check, X, Trash, Sigma } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditTask from "@/components/ui/hooks/edit-task";
import { useState, useEffect } from "react";
import api from "@/Api Tarefas/Api-Tarefas/src/services/api";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const getTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      await api.post("/tasks", {
        title: newTask,
        completed: false,
      });

      setNewTask("");
      await getTasks();
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      await getTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const toggleTaskCompleted = async (task: Task) => {
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        completed: !task.completed,
      });

      await getTasks();
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
    }
  };

  const clearCompletedTasks = async () => {
    try {
      const completedTasks = tasks.filter((task) => task.completed);

      await Promise.all(
        completedTasks.map((task) => api.delete(`/tasks/${task.id}`))
      );

      await getTasks();
    } catch (error) {
      console.error("Erro ao limpar tarefas concluídas:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const progress = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0;

  return (
    <main className="w-full h-screen bg-black flex justify-center items-center">
      <Card className="w-lg p-4">
        <CardHeader className="flex gap-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="rounded-md"
            placeholder="Adicionar Tarefa"
          />
          <Button
            onClick={addTask}
            variant="outline"
            className="cursor-pointer bg-red-500 text-white rounded-md"
          >
            <Plus /> Adicionar tarefa
          </Button>
        </CardHeader>

        <Separator />

        <CardContent>
          <Separator className="mb-4" />

          <div className="flex gap-2 mb-2">
            <Badge
              className="cursor-pointer rounded-md"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              <List /> Todas
            </Badge>

            <Badge
              className="cursor-pointer rounded-md"
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
            >
              <X /> Pendentes
            </Badge>

            <Badge
              className="cursor-pointer rounded-md"
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
            >
              <Check /> Concluídas
            </Badge>
          </div>

          <div className="border-b-1 flex flex-col">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="h-12 flex justify-between items-center border-t-1"
              >
                <div
                  className={
                    task.completed
                      ? "w-1 h-full bg-green-400"
                      : "w-1 h-full bg-red-400"
                  }
                />

                <p
                  className={`flex-1 px-2 text-sm cursor-pointer hover:text-gray-700 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                  onClick={() => toggleTaskCompleted(task)}
                >
                  {task.title}
                </p>

                <div className="flex items-center gap-2">
                  <EditTask task={task} refreshTasks={getTasks} />
                  <Trash
                    size={16}
                    className="cursor-pointer"
                    onClick={() => deleteTask(task.id)}
                  />
                </div>
              </div>
            ))}

            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="outline" className="text-xs rounded-md mt-3">
                  <Trash className="w-4 h-4 mr-2" />
                  Limpar Concluídas
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja excluir as tarefas concluídas?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Não</AlertDialogCancel>
                  <AlertDialogAction onClick={clearCompletedTasks}>
                    Sim
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-2 bg-red-500 rounded-md"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">{totalTasks} tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;