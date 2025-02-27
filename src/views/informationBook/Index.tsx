"use client";

import Location from "@/component/Location/Location";
import { IGlobal } from "@/interfaces/globalState";
import { IBook } from "@/interfaces/interfacesBooks";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loading from "@/component/Loader/Loader";

const Index = ({ books }: { books: IBook[] }) => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [book, setBook] = useState<IBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (books && books.length > 0) {
      const book = books.find((book) => book.id === id);
      if (book) {
        setBook(book);
      }
      setIsLoading(false);
    } else {
      fetch("/api/libros/" + id)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setBook(data.data);
          } else {
            toast.error(data.message);
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [id, books]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-col flex lg:flex-row justify-center items-center my-5 gap-5 relative">
      <IoMdArrowRoundBack
        size={32}
        className="absolute top-0 left-5 cursor-pointer"
        onClick={() => {
          router.back();
        }}
      />

      <div className="mt-9 shadow-md rounded-md p-5 flex justify-center flex-col gap-4">
        <picture className="flex justify-center items-center">
          <Image
            width={200}
            height={280}
            alt={"Imagen de " + "titulo"}
            src={book?.imagen || ""}
            className="rounded-md"
          />
        </picture>
        <article className="text-center">
          <h1 className="text-2xl  flex justify-center items-center   font-bold">
            <strong className="max-w-[300px]">{book?.titulo}</strong>
          </h1>
          <p className="text-lg">Año: {book?.anioPublicacion}</p>
          <p className="text-lg">Autor: {book?.autor}</p>
          <p className="text-lg">Editorial: {book?.editorial}</p>
          <p className="text-lg">No. Páginas: {book?.numPag}</p>
          {book?.cantidad && (
            <p className="text-lg">Cantidad: {book?.cantidad}</p>
          )}
        </article>
      </div>

      <div className=" w-[320px] md:w-[50%] mx-5 flex-col flex gap-5">
        {book?.descripcion && (
          <div>
            <h2 className="font-bold text-2xl my-2">Descripción</h2>
            <p className="text-justify leading-8">{book?.descripcion}</p>
          </div>
        )}
        <div>
          <h2 className="font-bold text-2xl my-2">Ubicación</h2>
          <Location
            selectedCell={{
              row: book?.ubicacion.row || 0,
              col: book?.ubicacion.col || 0,
            }}
            setSelectedCell={() => {}}
            row={book?.ubicacion.respisa === "1" ? 3 : 4}
            col={book?.ubicacion.respisa === "1" ? 5 : 6}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobal) => ({
  books: state.books.books || [],
});

export default connect(mapStateToProps, null)(Index);
