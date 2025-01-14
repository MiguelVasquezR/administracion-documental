import * as yup from "yup";

export const BookValidator = yup.object().shape({
  imagen: yup.string().required(),
  titulo: yup.string().required(),
  autor: yup.string().required(),
  editorial: yup.string().required(),
  numPag: yup.string().required(),
  anioPublicacion: yup.string().required(),
  ubicacion: yup.object().shape({
    col: yup.number().optional(),
    row: yup.number().optional(),
    respisa: yup.string().required(),
  }),
  tipo: yup.string().required(),
});
