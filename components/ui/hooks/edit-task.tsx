import { SquarePen } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../dialog"
import { Input } from "../input"
import { Button } from "../button"
import { useState } from "react"
import axios from "axios"

type Task = {
  id: number
  title: string
  completed: boolean
}

type EditTaskProps = {
  task: Task
  refreshTasks: () => void
}

const EditTask = ({ task, refreshTasks }: EditTaskProps) => {

  const [title, setTitle] = useState(task.title)

  const updateTask = async () => {
    try {
      await axios.put("/api/tasks", {
        id: task.id,
        title
      })
      refreshTasks()
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <SquarePen size={16} className="cursor-pointer"/>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 rounded-md">
          <Input
            className="rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Editar tarefa"
          />

          <Button
            className="rounded-md cursor-pointer"
            onClick={updateTask}
          >
            Editar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask