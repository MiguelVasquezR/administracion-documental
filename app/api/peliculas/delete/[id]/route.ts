import { deleteData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const id = request.url.split("/")[6];
  const response = await deleteData("peliculas", id as string);
  if (response) {
    return NextResponse.json({
      message: "Pelicula eliminada correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al eliminar la pelicula",
      status: 400,
    });
  }
}
