"use client";

import LinkButton from "@/component/LinkButton/LinkButton";
import { IBook } from "@/interfaces/interfacesBooks";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Index = () => {
  const router = useRouter();
  const [libros, setLibros] = useState([]);
  const [librosSeleccionados, setLibrosSeleccionados] = useState<IBook | null>(
    null
  );
  const [loadingType, setLoadingType] = useState<{
    isLoading: boolean;
    isDeleting: boolean;
  }>({
    isLoading: false,
    isDeleting: false,
  });

  useEffect(() => {
    setLoadingType({
      ...loadingType,
      isLoading: true,
    });
    handleGetLibros();
  }, []);

  const handleGetLibros = async () => {
    fetch("/api/libros")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setLibros(data.data);
        } else {
          toast.error("Por el momento no es posible obtener los libros");
        }
      });
  };

  const handleDelete = async () => {
    if (loadingType?.isDeleting) return;
    fetch(`/api/libros/delete/${librosSeleccionados?.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
          setLibrosSeleccionados(null);
          handleGetLibros();
        } else {
          toast.error(data.message);
        }
      })
      .catch(() => {
        toast.error("Error al eliminar el libro");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("autenticado") !== "true") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center p-5">
        <h2 className="text-2xl font-bold">Libros</h2>
        <LinkButton href="/libros/agregar" text="Agregar Libro" />
      </div>
      <div className="grid grid-cols-2 p-5">
        <div className="col-span-1">
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg font-bold">Todos los libros</p>
            <div className="flex flex-row justify-between items-center">
              <MdModeEditOutline
                size={28}
                className="cursor-pointer"
                color={!librosSeleccionados ? "gray" : "black"}
                onClick={() =>
                  router.push(`/libros/editar/${librosSeleccionados?.id}`)
                }
              />
              <MdDelete
                size={28}
                className="cursor-pointer"
                color={!librosSeleccionados ? "gray" : "black"}
                onClick={handleDelete}
              />
            </div>
          </div>

          <br />
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Titulo</th>
                <th className="border border-gray-400 px-4 py-2">Autor</th>
                <th className="border border-gray-400 px-4 py-2">Año</th>
                <th className="border border-gray-400 px-4 py-2">Editorial</th>
                <th className="border border-gray-400 px-4 py-2">Tipo</th>
                <th className="border border-gray-400 px-4 py-2">
                  Número de páginas
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {libros.map((libro: IBook) => (
                <tr
                  key={libro.id}
                  onClick={() => setLibrosSeleccionados(libro)}
                  className={clsx(
                    "cursor-pointer",
                    libro.id === librosSeleccionados?.id &&
                      "bg-primary/80 text-white"
                  )}
                >
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.titulo}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.autor}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.anioPublicacion}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.editorial}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.tipo}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.numPag}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-1">
          <h2 className="text-2xl font-bold"></h2>
        </div>
      </div>
    </>
  );
};

export default Index;
