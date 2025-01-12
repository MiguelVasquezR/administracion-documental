import * as yup from "yup";

export const UserValidator = yup.object({
  nombre: yup.string().required("El nombre es requerido"),
  correo: yup
    .string()
    .email("El correo no es valido")
    .required("El correo es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});
