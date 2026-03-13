type Task = {
  id: number
  title: string
  completed?: boolean
}

let tasks: Task[] = []

export async function GET() {
  return Response.json(tasks)
}

export async function POST(req: Request) {
  const body = await req.json()

  const newTask: Task = {
    id: Date.now(),
    ...body
  }

  tasks.push(newTask)

  return Response.json(newTask)
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get("id"))

  tasks = tasks.filter(task => task.id !== id)

  return Response.json({ message: "Tarefa removida" })
}

export async function PUT(req: Request) {

  const body = await req.json()
  const { id, title } = body

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, title } : task
  )

  return Response.json({ message: "Tarefa editada com sucesso" })
}