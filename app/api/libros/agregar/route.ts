import { writeData } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const response = await writeData("libros", payload);
  if (response === 200) {
    return NextResponse.json({
      message: "Libro agregado correctamente",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Error al agregar el libro",
      status: 400,
    });
  }
}
