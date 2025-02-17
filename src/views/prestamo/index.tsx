"use client";

import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import TextField from "@/component/TextField/TextField";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IBook, IStudent } from "@/interfaces/interfacesBooks";

interface Props {
  closeModal: () => void;
  openModal: boolean;
}

const Index = ({ closeModal, openModal }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [openModalStudent, setOpenModalStudent] = useState(false);

  const [students, setStudents] = useState<IStudent[]>([]);
  const [books, setBooks] = useState<IBook[]>([]);

  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("autenticado") !== "true") {
      window.location.href = "/biblioteca";
    }
  }, []);

  const onSubmit = (data: FieldValues) => {
    fetch("/api/estudiantes", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setOpenModalStudent(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("/api/estudiantes")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setStudents(data.data);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));

    fetch("/api/libros")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setBooks(data.data);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmitPrestamo = (e: FieldValues) => {
    e.preventDefault();
    if (selectedBook && selectedStudent) {
      const data = {
        libro: selectedBook,
        estudiante: selectedStudent,
        fechaPrestamo: new Date().toLocaleDateString(),
        fechaDevolucion: new Date(
          new Date().setDate(new Date().getDate() + 15)
        ).toLocaleDateString(),
      };

      fetch("/api/prestamo", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            toast.success(data.message);
            closeModal();
          } else {
            toast.error(data.message);
          }
        })
        .catch(() => toast.error("Ocurrio un error, intentelo más tarde"));
    } else {
      toast.error("Asegurate de seleccionar un libro y un estudiante");
    }
  };

  return (
    <div
      className={`w-screen h-screen bg-black/30 absolute top-0 left-0 ${
        openModal
          ? "animate-fade-up"
          : "animate-jump-out animate-once animate-duration-1000"
      }`}
    >
      {openModalStudent ? (
        <div className="w-full h-full flex justify-center items-center">
          <form
            className="rounded-md p-5 shadow-md w-[50%] h-[50%] bg-white relative flex flex-col gap-5 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-bold">Información del Estudiante</h1>
            <p className="text-red-500">*Todos los campos son requeridos</p>
            <IoCloseCircleOutline
              className="text-primary text-4xl absolute top-1 right-1 cursor-pointer"
              onClick={() => setOpenModalStudent(false)}
            />
            <div className="flex flex-col gap-5">
              <TextField
                label="Nombre Completo"
                errors={!!errors.titulo}
                placeholder="Nombre Completo"
                value={watch("nombre")}
                type={"text"}
                isLabel={false}
                message={""}
                {...register("nombre")}
              />

              <TextField
                label="Matrícula"
                errors={!!errors.titulo}
                placeholder="Matrícula"
                value={watch("matricula")}
                type={"text"}
                isLabel={false}
                message={""}
                {...register("matricula")}
              />

              <TextField
                label="Correo"
                errors={!!errors.titulo}
                placeholder="Correo"
                value={watch("correo")}
                type={"text"}
                isLabel={false}
                message={""}
                {...register("correo")}
              />

              <button
                type="submit"
                className="bg-primary text-white px-5 py-2 rounded-md"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <form
            onSubmit={onSubmitPrestamo}
            className="rounded-md p-5 shadow-md w-[50%] h-[50%] bg-white relative flex flex-row gap-5 "
          >
            <IoCloseCircleOutline
              className="text-primary text-4xl absolute top-1 right-1 cursor-pointer"
              onClick={closeModal}
            />
            <div className=" h-full bg-white w-1/2 flex gap-5 flex-col">
              <div className="w-full">
                <div className="w-[200px] lg:w-[400px]">
                  <label className="py-5 font-bold">
                    Ingrese el titulo del Libro
                  </label>
                  <div className="w-full border border-gray-400 rounded-md p-1 relative">
                    <select
                      name=""
                      id=""
                      className="border-transparent w-full h-full p-2 outline-none"
                      onChange={(e) => {
                        const book = books.find(
                          (book) => book.id === e.target.value
                        );
                        setSelectedBook(book ?? null); // Asegúrate de que no sea undefined
                      }}
                    >
                      {books.map((book) => (
                        <option key={book.id} value={book.id}>
                          {book.titulo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="w-[200px] lg:w-[400px]">
                  <label className="py-5 font-bold">Ingresa la matricula</label>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="w-full border border-gray-400 rounded-md p-1 relative">
                      <select
                        name=""
                        id=""
                        className="border-transparent w-full h-full p-2 outline-none"
                        onChange={(e) => {
                          const student = students.find(
                            (student) => student.id === e.target.value
                          );
                          setSelectedStudent(student ?? null); // Asegúrate de que no sea undefined
                        }}
                      >
                        {students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.matricula}
                          </option>
                        ))}
                      </select>
                    </div>
                    <HiUserAdd
                      className="text-primary text-4xl cursor-pointer"
                      onClick={() => setOpenModalStudent(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full bg-white w-1/2">
              <p className="text-2xl font-bold">Información de Prestamo</p>

              <div>
                <p className="font-bold text-xl">Información del libro</p>
                <p>Titulo: {selectedBook?.titulo}</p>
                <p>Autor: {selectedBook?.autor}</p>
                <p>Año: {selectedBook?.anioPublicacion}</p>
                <p>Editorial: {selectedBook?.editorial}</p>
              </div>

              <div>
                <p className="font-bold text-xl">Información del alumno</p>
                <p>Nombre: {selectedStudent?.nombre}</p>
                <p>Matricula: {selectedStudent?.matricula}</p>
                <p>Correo: {selectedStudent?.correo}</p>
              </div>

              <div>
                <p className="font-bold text-xl">Información del prestamo</p>
                <p>Fecha de prestamo: {new Date().toLocaleDateString()}</p>
                <p>
                  Fecha de devolución:{" "}
                  {new Date(
                    new Date().setDate(new Date().getDate() + 15)
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-end my-5">
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-2 rounded-md"
                >
                  Guardar Prestamo
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Index;
