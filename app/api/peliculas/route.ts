import { getData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await getData("peliculas");
  if (response) {
    return NextResponse.json({
      message: "Peliculas obtenidas correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al obtener las peliculas",
      status: 400,
    });
  }
}
