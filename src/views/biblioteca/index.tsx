"use client";

import CardBook from "@/component/CardBook";
import TextField from "@/component/TextField/TextField";
import { IGlobal } from "@/interfaces/globalState";
import { IBook } from "@/interfaces/interfacesBooks";
import { setBooks } from "@/redux/books";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { connect } from "react-redux";

interface IProps {
  books: IBook[];
  setBooks: (books: IBook[]) => void;
}

const Index = ({ books, setBooks }: IProps) => {
  const { register, watch, setValue } = useForm();

  useEffect(() => {
    if (localStorage.getItem("autenticado") !== "true") {
      window.location.href = "/login";
    }
    setValue("search", "");
  }, []);

  useEffect(() => {
    if (books === undefined || books.length < 1) {
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
    }
  }, []);

  const filterBooks = books.filter((book) =>
    book.titulo?.toLowerCase().includes(watch("search")?.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center p-5">
        <p className="text-2xl font-bold">Biblioteca</p>
        <div className="w-[200px] lg:w-[400px]">
          <TextField
            label="Búsqueda"
            placeholder="Búsqueda"
            value={watch("search")}
            type={"text"}
            isLabel={false}
            {...register("search")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-5 w-full">
        {filterBooks?.map((book: IBook, index: number) => (
          <CardBook key={index} {...book} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobal) => {
  return {
    books: state.books.books || [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setBooks: (books: IBook[]) => dispatch(setBooks(books)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
