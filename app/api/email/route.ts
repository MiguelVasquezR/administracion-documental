// pages/api/send-email.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const Correo = () => {
  return `
      <div>
        <h1>Notificación de la facultad</h1>
        <p>Recuerda pasar a entregar el material del documental lo más pronto posible!</p>
        <p>Saludos cordiales, Facultad de Letras Españolas</p>
      </div>
    `;
};

export async function POST(req: Request) {
  const correo = req.url.split("=")[1];
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "letrasespanolas5@gmail.com",
        pass: "xhrm fiwt mzpz lohj",
      },
    });
    const mailOptions = {
      from: "letrasespanolas5@gmail.com",
      to: correo,
      subject:
        "Notificación de la facultad - Tienes entregas pendientes en documental",
      html: Correo(),
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      message: "Se le ha notificado al estudiantes.",
      status: 200,
    });
  } catch (e) {
    console.log("Error: ", e);
    return NextResponse.json({
      message: "No fue posible notificar al estudiante, intente de nuevo.",
      status: 400,
    });
  }
}
