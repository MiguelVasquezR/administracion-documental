"use client";

import CardBook from "@/component/CardBook";
import TextField from "@/component/TextField/TextField";
import { IGlobal } from "@/interfaces/globalState";
import { IBook } from "@/interfaces/interfacesBooks";
import { setBooks } from "@/redux/books";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import Loading from "@/component/Loader/Loader";
import Empty from "@/component/Empty/Empty";

interface IProps {
  books: IBook[];
  setBooks: (books: IBook[]) => void;
}

const Index = ({ books, setBooks }: IProps) => {
  const { register, watch, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setValue("search", "");
    if (books === undefined || books.length < 1) {
      fetch("/api/libros")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setBooks(data.data);
          } else {
            toast.error(data.message);
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoading(false);
    }
  }, []);

  const filterBooks = books.filter((book) =>
    book.titulo?.toLowerCase().includes(watch("search")?.toLowerCase())
  );

  if (isLoading) {
    return <Loading />;
  }

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
      {filterBooks.length > 0 ? (
        <>
          <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-5 w-full">
            {filterBooks?.map((book: IBook, index: number) => (
              <CardBook key={index} {...book} />
            ))}
          </div>
        </>
      ) : (
        <Empty />
      )}
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
