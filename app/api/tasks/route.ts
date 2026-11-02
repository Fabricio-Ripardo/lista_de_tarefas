import { NextResponse } from "next/server"
import { DJANGO_API_URL } from "@/lib/django"


export async function GET() {
  try {
    const response = await fetch(`${DJANGO_API_URL}/tasks/`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar tarefas no Django" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${DJANGO_API_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar tarefa no Django" },
      { status: 500 }
    );
  }
}

