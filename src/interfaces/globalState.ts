import { IBook, IMovie, IPrestamo, IUsuario } from "./interfacesBooks";

interface IStateMovies {
  movies: IMovie[];
}

interface IStateBooks {
  books: IBook[];
}

interface IStatePrestamos {
  prestamos: IPrestamo[];
}

export interface IGlobal {
  usuario: IUsuario;
  movies: IStateMovies;
  books: IStateBooks;
  prestamos: IStatePrestamos;
}
