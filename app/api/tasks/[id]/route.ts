import { NextResponse } from "next/server";
import { DJANGO_API_URL } from "@/lib/django";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: Request, { params }: Context) {
  try {
    const { id } = await params;

    const response = await fetch(`${DJANGO_API_URL}/tasks/${id}/`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar tarefa no Django" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Context) {
  try {
    const { id } = await params;
    const body = await req.json();

    const response = await fetch(`${DJANGO_API_URL}/tasks/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar tarefa no Django" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: Context) {
  try {
    const { id } = await params;
    const body = await req.json();

    const response = await fetch(`${DJANGO_API_URL}/tasks/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar parcialmente tarefa no Django" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Context) {
  try {
    const { id } = await params;

    const response = await fetch(`${DJANGO_API_URL}/tasks/${id}/`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const text = await response.text();
    return new NextResponse(text, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar tarefa no Django" },
      { status: 500 }
    );
  }
}