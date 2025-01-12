"use client";

import { IPrestamo } from "@/interfaces/interfacesBooks";
import { getFecha } from "../../../app/utils/Utils";
import ModalPrestamo from "@/views/prestamo";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
const Index = () => {
  const [openModal, setOpenModal] = useState(false);

  const [prestamos, setPrestamos] = useState<IPrestamo[]>([]);

  useEffect(() => {
    if (localStorage.getItem("autenticado") !== "true") {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    fetch("/api/prestamo", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setPrestamos(data.data);
        } else {
          toast.error(data.message);
        }
      });
  }, []);

  const handleEntregar = (prestamo: IPrestamo) => {
    prestamo.estado = "Entregado";
    fetch("/api/prestamo", {
      method: "PUT",
      body: JSON.stringify(prestamo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between p-4 text-lg font-bold">
        <div>
          <h2>Hola, Miguel ✋🏻</h2>
          <p>{getFecha()}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="bg-primary text-white px-5 py-2 rounded-md"
        >
          Nuevo Prestamo
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 p-5">
        {prestamos.map((prestamo: IPrestamo, index: number) => {
          return (
            <div
              key={index}
              className="w-[350px] rounded-md shadow-md flex flex-row justify-center items-center gap-2 cursor-pointer"
            >
              <div className="w-[40%] h-full bg-primary/50 rounded-md">
                <Image
                  src={prestamo?.libro?.imagen}
                  alt="libro"
                  width={120}
                  height={200}
                  className="rounded-md w-full h-full object-fill"
                />
              </div>
              <div className="w-[60%] px-2">
                <div>
                  <label className="text-sm font-bold">Estudiante: </label>
                  <p className="text-md">{prestamo?.estudiante?.nombre}</p>
                </div>

                <div>
                  <label className="text-sm font-bold">Libro: </label>
                  <p className="text-md">{prestamo?.libro?.titulo}</p>
                </div>

                <div>
                  <label className="text-sm font-bold">
                    Fecha de Prestamo:{" "}
                  </label>
                  <p className="text-md">{prestamo?.fechaPrestamo}</p>
                </div>

                <div>
                  <label className="text-sm font-bold">
                    Fecha de Devolución:{" "}
                  </label>
                  <p className="text-md">{prestamo?.fechaDevolucion}</p>
                </div>
                <div className="flex flex-row justify-end p-2">
                  {prestamo?.estado === "Entregado" ? (
                    <p className="text-md">Entregado</p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        handleEntregar(prestamo);
                      }}
                      className="bg-primary text-white px-2 py-2 rounded-md"
                    >
                      {prestamo?.estado === "Entregado"
                        ? "Entregado"
                        : "Entregar"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {openModal && (
        <ModalPrestamo
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default Index;
