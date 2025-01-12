import { getDataById } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const id = request.url.split("/")[5];
  const response = await getDataById("usuarios", id as string);
  if (response) {
    return NextResponse.json({
      message: "Usuario obtenido correctamente",
      status: 200,
      data: response,
    });
  } else {
    return NextResponse.json({
      message: "Error al obtener el usuario",
      status: 400,
    });
  }
}
