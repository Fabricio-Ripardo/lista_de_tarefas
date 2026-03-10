import { SquarePen } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const EditTask = () => {
    return (
        <Dialog>
          <DialogTrigger asChild>
            <SquarePen size={16} className="cursor-pointer"/>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Tarefa</DialogTitle>
            </DialogHeader>
            <div className="flex gap-2 rounded-md">
              <Input className="rounded-md" placeholder="Editar tarefa" />
              <Button className="rounded-md cursor-pointer">Editar</Button>
            </div>
          </DialogContent>
        </Dialog>
    )
}
export default EditTask