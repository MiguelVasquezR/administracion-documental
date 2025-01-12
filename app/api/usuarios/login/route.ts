import { login } from "@/services/firebase/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const response = await login(payload.email, payload.password);
  if (response.status === 200) {
    return NextResponse.json({
      message: "Usuario autenticado correctamente",
      status: 200,
      user: response.user,
    });
  } else {
    return NextResponse.json({
      message: "Error al autenticar el usuario",
      status: 400,
    });
  }
}
