import * as yup from "yup";

export const BookValidator = yup.object().shape({
  imagen: yup.string().required("Debes subir una imagen"),
  titulo: yup.string().required("Debes ingresar un título"),
  autor: yup.string().required("Debes ingresar un autor"),
  editorial: yup.string().required("Debes ingresar una editorial"),
  numPag: yup.string().required("Debes ingresar un número de páginas"),
  anioPublicacion: yup
    .string()
    .required("Debes ingresar un año de publicación"),
  ubicacion: yup.object().shape({
    col: yup.number().optional(),
    row: yup.number().optional(),
    respisa: yup.string().required(),
  }),
  tipo: yup.string().required("Debes ingresar un tipo de libro"),
  descripcion: yup.string().required("Debes ingresar una descripción"),
  cantidad: yup.number().required("Debes ingresar una cantidad"),
});
