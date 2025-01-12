"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@/component/TextField/TextField";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { UserValidator } from "@/validator/UsuariosValidatos";

const AgregarPelicula = () => {
  const router = useRouter();
  const params = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(UserValidator),
  });

  useEffect(() => {
    if (localStorage.getItem("autenticado") !== "true") {
      window.location.href = "/login";
    }
  }, []);

  const onSubmit = async (data: any) => {
    data.id = params.id || "";

    // Envolver la operación en toast.promise
    await toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`/api/usuarios`, {
            method: params.id ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const dataResponse = await response.json();

          if (dataResponse.status === 200) {
            resolve(dataResponse.message);
            router.push("/usuario");
          } else {
            reject(new Error(dataResponse.message));
          }
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Guardando datos...",
        success: params.id ? "¡Usuario actualizado!" : "¡Usuario agregado!",
        error: "Error al guardar los datos.",
      }
    );
  };

  useEffect(() => {
    if (params.id) {
      fetch(`/api/usuarios/${params.id}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            reset(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params.id]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[900px] p-5">
        <p className="text-2xl font-bold">Información de la pelicula</p>
        <form className="flex flex-col justify-center items-center gap-5 py-5">
          <TextField
            label="Nombre"
            errors={!!errors.nombre}
            placeholder="Nombre"
            onChange={(value) => {
              setValue("nombre", value);
            }}
            value={watch("nombre")}
            type={"text"}
            register={register("nombre")}
            isLabel={false}
            message={errors?.nombre?.message}
          />
          <TextField
            label="Correo"
            errors={!!errors.correo}
            placeholder="Correo"
            onChange={(value) => {
              setValue("correo", value);
            }}
            value={watch("correo")}
            type={"email"}
            register={register("correo")}
            isLabel={false}
            message={errors?.correo?.message}
          />
          <TextField
            label="Contraseña"
            errors={!!errors.password}
            placeholder="Contraseñ"
            onChange={(value) => {
              setValue("password", value);
            }}
            value={watch("password")}
            type={"text"}
            register={register("password")}
            isLabel={false}
            message={errors?.password?.message}
          />
        </form>
        <div className="flex flex-row justify-end items-center gap-5 w-full">
          <button
            onClick={() =>
              reset({
                nombre: "",
                correo: "",
                password: "",
              })
            }
            className="bg-white text-primary p-2 rounded-md w-1/4 border-primary border-2"
          >
            Limpiar
          </button>
          <button
            className="bg-primary text-white p-2 rounded-md w-1/4"
            onClick={handleSubmit(onSubmit)}
          >
            {params.id ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarPelicula;
