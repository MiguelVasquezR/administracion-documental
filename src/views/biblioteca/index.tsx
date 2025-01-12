"use client";

import CardBook from "@/component/CardBook";
import TextField from "@/component/TextField/TextField";
import { IBook } from "@/interfaces/interfacesBooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Index = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const { register } = useForm();

  useEffect(() => {
    if (localStorage.getItem("autenticado") !== "true") {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
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

  return (
    <>
      <div className="flex flex-row justify-between items-center p-5">
        <p className="text-2xl font-bold">Biblioteca</p>
        <div className="w-[200px] lg:w-[400px]">
          <TextField
            register={register("search")}
            placeholder="Buscar"
            onChange={(e) => {
              setSearch(e);
            }}
            value={search}
            type="text"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-5 w-full">
        {books.map((book: IBook, index: number) => (
          <CardBook key={index} {...book} />
        ))}
      </div>
    </>
  );
};

export default Index;
