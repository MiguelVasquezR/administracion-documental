import { Metadata } from "next";
import React from "react";
import Login from "@/views/login/login";

export const metadata: Metadata = {
  title: "Inicio Sesión",
  description: "Sistema de administración de documental de letras españolas",
};

const page = () => {
  return <Login />;
};

export default page;
