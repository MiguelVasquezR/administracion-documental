"use client";

import { convertToBase64 } from "@/utils/Utils";
import { MovieValidator } from "@/validator/MovieValidator";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UploadImage from "@/component/UploadImage/UploadImage";
import TextField from "@/component/TextField/TextField";
import toast from "react-hot-toast";
import TextList from "@/component/TextList/TextList";
import { useParams, useRouter } from "next/navigation";
import { countries } from "@/utils/Countries";
import { languages } from "@/utils/Languages";

const AgregarPelicula = () => {
  const [image, setImage] = useState<string>("");
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
    resolver: yupResolver(MovieValidator),
  });

  useEffect(() => {
    if (localStorage.getItem("autenticado") !== "true") {
      window.location.href = "/login";
    }
  }, []);

  const handleUpload = async (file: File) => {
    if (!file) return alert("Selecciona una imagen primero");
    const formData = new FormData();
    formData.append("file", file);
    const base64 = await convertToBase64(file);
    const response = await fetch("/api/cloudinary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: base64 }),
    });
    const data = await response.json();
    if (data.url) {
      setValue("imagen", data.url);
      setImage(data.url);
    } else {
      alert("Error al subir la imagen");
    }
  };

  const onSubmit = async (data: any) => {
    data.imagen =
      image ||
      "https://res.cloudinary.com/dvt4vznxn/image/upload/v1736555915/yivyktkgvcjxprwwnwui.png";
    data.id = params.id || "";

    const response = await fetch(
      `/api/peliculas/${params.id ? "editar" : "agregar"}`,
      {
        method: params.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const dataResponse = await response.json();
    if (dataResponse.status === 200) {
      toast.success(dataResponse.message);
      router.push("/pelicula");
    } else {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetch(`/api/peliculas/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            reset(data.data);
            setImage(data.data.imagen);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params.id]);

  return (
    <div className="grid grid-cols-3 p-5">
      <div className="col-span-1 flex justify-center items-start">
        <UploadImage
          image={image}
          handleImageCapture={handleUpload}
          register={register}
        />
      </div>
      <div className="col-span-2">
        <p className="text-2xl font-bold">Información de la pelicula</p>
        <form className="flex flex-col justify-center items-center gap-5 py-5">
          <TextField
            label="Título"
            errors={!!errors.titulo}
            placeholder="Título"
            onChange={(value) => {
              setValue("titulo", value);
            }}
            value={watch("titulo")}
            type={"text"}
            register={register("titulo")}
            isLabel={false}
            message={errors?.titulo?.message}
          />
          <TextField
            label="Director"
            errors={!!errors.director}
            placeholder="Director"
            onChange={(value) => {
              setValue("director", value);
            }}
            value={watch("director")}
            type={"text"}
            register={register("director")}
            isLabel={false}
            message={errors?.director?.message}
          />

          <div className="flex flex-row justify-between items-center gap-5 w-full">
            <TextField
              label="Año de Publicación"
              errors={!!errors.anioPublicacion}
              placeholder="Año de Publicación"
              onChange={(value) => {
                setValue("anioPublicacion", value);
              }}
              value={watch("anioPublicacion")}
              type={"text"}
              register={register("anioPublicacion")}
              isLabel={false}
              message={errors?.anioPublicacion?.message}
            />

            <div className="w-full border border-gray-400 rounded-md p-1 relative">
              <select
                name=""
                id=""
                value={watch("tipo")}
                className="border-transparent w-full h-full p-2 outline-none"
                onChange={(e) => setValue("tipo", e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="original">Original</option>
                <option value="copia">Copia</option>
                <option value="blue">Blue Ray</option>
              </select>
              {!!errors.tipo && (
                <p className="text-red-500">{errors.tipo.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row justify-between items-center gap-5 w-full">
            <TextField
              label="Duracion"
              errors={!!errors.duracion}
              placeholder="Duracion"
              onChange={(value) => {
                setValue("duracion", value);
              }}
              value={watch("duracion")}
              type={"text"}
              register={register("duracion")}
              isLabel={false}
              message={errors?.duracion?.message}
            />

            <TextField
              label="Genero"
              errors={!!errors.genero}
              placeholder="Genero"
              onChange={(value) => {
                setValue("genero", value);
              }}
              value={watch("genero")}
              type={"text"}
              register={register("genero")}
              isLabel={false}
              message={errors?.genero?.message}
            />
          </div>

          <TextList
            register={register("pais")}
            options={countries}
            placeholder="Pais"
            errors={!!errors.pais}
            message={errors?.pais?.message}
          />

          <div className="flex flex-row justify-between items-center gap-5 w-full">
            <div className="w-full">
              <TextList
                register={register("idioma")}
                options={languages}
                placeholder="Idioma"
                errors={!!errors.idioma}
                message={errors?.idioma?.message}
              />
            </div>

            <div className="w-full border border-gray-400 rounded-md p-1 relative">
              <select
                name=""
                id=""
                value={watch("subtitulos")}
                className="border-transparent w-full h-full p-2 outline-none"
                onChange={(e) => setValue("subtitulos", e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="si">Si</option>
                <option value="no">No</option>
              </select>
              {!!errors.subtitulos && (
                <p className="text-red-500">{errors.subtitulos.message}</p>
              )}
            </div>
          </div>
        </form>
        <div className="flex flex-row justify-end items-center gap-5 w-full">
          <button
            onClick={() =>
              reset({
                titulo: "",
                director: "",
                anioPublicacion: "",
                tipo: "",
                duracion: "",
                genero: "",
                pais: "",
                idioma: "",
                subtitulos: "",
                imagen: "",
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