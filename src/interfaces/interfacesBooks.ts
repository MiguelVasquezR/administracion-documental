export interface IBook {
  id: string;
  titulo: string;
  autor: string;
  anioPublicacion: string;
  editorial: string;
  description: string;
  tipo: string;
  imagen: string;
  numPag: string;
  ubicacion: {
    col?: number;
    row?: number;
    respisa: string;
  };
}

export interface IMovie {
  id: string;
  titulo: string;
  director: string;
  anioPublicacion: string;
  tipo: string;
  duracion: string;
  genero: string;
  pais: string;
  idioma: string;
  subtitulos: string;
  imagen: string;
}

export interface IStudent {
  id: string;
  nombre: string;
  matricula: string;
  correo: string;
}

export interface IPrestamo {
  id: string;
  libro: IBook;
  estudiante: IStudent;
  fechaPrestamo: string;
  fechaDevolucion: string;
  estado: string;
}

export interface IUsuario {
  id: string;
  nombre: string;
  Nombre: string;
  correo: string;
  contrasena: string;
}
