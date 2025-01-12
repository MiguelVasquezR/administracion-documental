import { getData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await getData("libros");
  if (response) {
    return NextResponse.json({
      message: "Libros obtenidos correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al obtener los libros",
      status: 400,
    });
  }
}
