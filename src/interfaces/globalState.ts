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

interface IStateUser {
  usuario: IUsuario;
}

export interface IGlobal {
  user: IStateUser;
  movies: IStateMovies;
  books: IStateBooks;
  prestamos: IStatePrestamos;
}
