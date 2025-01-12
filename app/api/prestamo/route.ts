import { getData, updateData, writeData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const response = await writeData("prestamos", payload);
  if (response === 200) {
    return NextResponse.json({
      message: "Prestamo agregado correctamente",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Error al agregar el prestamo",
      status: 400,
    });
  }
}

export async function GET() {
  const response = await getData("prestamos");
  if (response) {
    return NextResponse.json({
      message: "Prestamos obtenidos correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al obtener los prestamos",
      status: 400,
    });
  }
}

export async function PUT(req: Request) {
  const payload = await req.json();
  const response = await updateData("prestamos", payload.id, payload);
  if (response) {
    return NextResponse.json({
      message: "Prestamo entregado correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al actualizar el prestamo",
      status: 400,
    });
  }
}
