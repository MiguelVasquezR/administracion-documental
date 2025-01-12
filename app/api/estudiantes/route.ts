import { getData, writeData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const response = await writeData("estudiantes", payload);
  if (response === 200) {
    return NextResponse.json({
      message: "Estudiante agregado correctamente",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Error al agregar el estudiante",
      status: 400,
    });
  }
}

export async function GET() {
  const response = await getData("estudiantes");
  if (response) {
    return NextResponse.json({
      message: "Estudiantes obtenidos correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al obtener los estudiantes",
      status: 400,
    });
  }
}
