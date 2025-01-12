import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { file } = await request.json();
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
    console.log(cloudName);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (data.secure_url) {
      return NextResponse.json({ url: data.secure_url }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Error al subir la imagen" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
