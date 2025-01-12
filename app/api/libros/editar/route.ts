import { updateData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const data = await request.json();
  const response = await updateData("libros", data.id, data);

  if (response) {
    return NextResponse.json({
      message: "Libro editado correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al editar el libro",
      status: 400,
    });
  }
}
