import React from "react";

import AgregarPelicula from "@/views/pelicula/agregarPelicula/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agregar Libro",
  description: "Sistema de administración de documental de letras españolas",
};

const page = () => {
  return <AgregarPelicula />;
};

export default page;
