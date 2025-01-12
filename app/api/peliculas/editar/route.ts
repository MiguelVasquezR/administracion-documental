import { updateData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const data = await request.json();
  const response = await updateData("peliculas", data.id, data);

  if (response) {
    return NextResponse.json({
      message: "Pelicula editada correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al editar la pelicula",
      status: 400,
    });
  }
}
