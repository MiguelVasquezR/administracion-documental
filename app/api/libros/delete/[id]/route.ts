import { deleteData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const id = request.url.split("/")[6];
  const response = await deleteData("libros", id as string);
  if (response) {
    return NextResponse.json({
      message: "Libros eliminado correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al eliminar el libro",
      status: 400,
    });
  }
}
