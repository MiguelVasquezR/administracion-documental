import * as yup from "yup";

export const BookValidator = yup.object({
  titulo: yup.string().required("El titulo es requerido"),
  autor: yup.string().required("El autor es requerido"),
  editorial: yup.string().required("La editorial es requerida"),
  numPag: yup.string().required("El numero de paginas es requerido"),
  anioPublicacion: yup.string().required("El año de publicacion es requerido"),
  ubicacion: yup.object().required("La ubicacion es requerida"),
  tipo: yup.string().required("El tipo es requerido"),
});
