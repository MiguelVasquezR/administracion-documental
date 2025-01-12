import { getData, updateData, writeData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const response = await writeData("usuarios", payload);
  if (response === 200) {
    return NextResponse.json({
      message: "Usuarios agregado correctamente",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Error al agregar el usuarios",
      status: 400,
    });
  }
}

export async function GET() {
  const response = await getData("usuarios");
  if (response) {
    return NextResponse.json({
      message: "Usuarios obtenidos correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al obtener los usuarioss",
      status: 400,
    });
  }
}

export async function PUT(req: Request) {
  const payload = await req.json();
  const response = await updateData("usuarios", payload.id, payload);
  if (response) {
    return NextResponse.json({
      message: "Usuarios entregado correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al actualizar el usuarios",
      status: 400,
    });
  }
}
