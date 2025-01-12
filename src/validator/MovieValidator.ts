import * as yup from "yup";

export const MovieValidator = yup.object({
  titulo: yup.string().required("El titulo es requerido"),
  director: yup.string().required("El director es requerido"),
  anioPublicacion: yup.string().required("El año de publicacion es requerido"),
  tipo: yup.string().required("El tipo es requerido"),
  duracion: yup.string().required("La duracion es requerida"),
  genero: yup.string().required("El genero es requerido"),
  pais: yup.string().required("El pais es requerido"),
  idioma: yup.string().required("El idioma es requerido"),
  subtitulos: yup.string().required("Los subtitulos son requeridos"),
  imagen: yup.string()
});
