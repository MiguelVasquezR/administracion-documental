import { writeData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const response = await writeData("peliculas", payload);
  if (response === 200) {
    return NextResponse.json({
      message: "Pelicula agregada correctamente",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Error al agregar la pelicula",
      status: 400,
    });
  }
}
