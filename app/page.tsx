import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Plus, List, Check, X, SquarePen, Trash, ListChecks, Sigma } from 'lucide-react';
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
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const home = () => {
  return (
    <main className="w-full h-screen bg-black flex justify-center items-center">

      <Card className="w-lg p-4">  
        <CardHeader className="flex  gap-2">
      <Input className="rounded-md" placeholder="Adicionar Tarefa"></Input>
      <Button variant="outline" className= "cursor-pointer bg-red-500 text-white rounded-md"><Plus /> Adicionar tarefa</Button>
      </CardHeader>
    <Separator />
      <CardContent>
        <Separator className= "mb-4" />
        <div className="flex gap-2">
        <Badge className="cursor-pointer rounded-md" variant={"default"}><List /> Todas</Badge>
        <Badge className="cursor-pointer rounded-md" variant={"outline"}><X /> Pendentes</Badge>
        <Badge className="cursor-pointer rounded-md" variant={"outline"}><Check /> Concluídas</Badge>
        </div>

        <div className=" mt-4 border-b-1">
          <div className=" h-12 flex justify-between items-center border-t-1">
          <div className="w-1 h-full bg-green-300"></div>
            <p className="flex-1 px-2 text-sm">Estudar react</p>
            <div className="flex items-center gap-2">
        <Dialog asChild>
          <DialogTrigger>
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

              <Trash size={16} className="cursor-pointer"/>
              
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-2">
          <div className="flex gap-2 items-center">
          <ListChecks size={18}/>
          <p className="text-xs mt-2">Tarefas concluídas (3/3)</p>
          </div>

      <AlertDialog>
  <AlertDialogTrigger >
          <Button variant="outline" className="text-xs cursor-pointer">
            <Trash />Limpar Concluídas
          </Button>
    </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Deseja excluir x tarefas?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação não pode ser desfeita. Isso excluirá permanentemente sua tarefa
        de nossos servidores.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>Sim</AlertDialogAction>
      <AlertDialogCancel>Não</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
        </div>

        <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
          <div className="h-2 bg-red-500 rounded-md" style={{ width: "50%" }}></div>
        </div>
        <div className="flex justify-end items-center mt-2 gap-2">
         <Sigma size={18}/>
         <p className="text-xs">3 tarefas no total</p>
        </div>


      </CardContent>
      </Card>
    </main>
  )
}
export default home 