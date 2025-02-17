"use client";

import TextField from "@/component/TextField/TextField";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CardMovie from "@/component/CardMovie";
import { IMovie } from "@/interfaces/interfacesBooks";
import { connect } from "react-redux";
import { setMovies } from "@/redux/movies";
import { Dispatch } from "@reduxjs/toolkit";
import { IGlobal } from "@/interfaces/globalState";

interface IIndexProps {
  movies: IMovie[];
  setPeliculas: (movies: IMovie[]) => void;
}

const Index = ({ movies: peliculas, setPeliculas }: IIndexProps) => {
  const { register, watch, setValue } = useForm();

  const filterMovies = peliculas.filter((book) =>
    book.titulo?.toLowerCase().includes(watch("search")?.toLowerCase())
  );

  useEffect(() => {
    setValue("search", "");
    if (peliculas === undefined || peliculas.length < 1) {
      fetch("/api/peliculas")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setPeliculas(data.data);
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [peliculas, setPeliculas]);

  return (
    <>
      <div className="flex flex-row justify-between items-center p-5">
        <p className="text-2xl font-bold">Videoteca</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
        {filterMovies.map((pelicula: IMovie) => (
          <CardMovie key={pelicula.id} {...pelicula} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobal) => {
  return {
    movies: state.movies.movies || [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setPeliculas: (movies: IMovie[]) => dispatch(setMovies(movies)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
