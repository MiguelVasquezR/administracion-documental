"use client";

import TextField from "@/component/TextField/TextField";
import Logo from "../../../public/Logo.png";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm, FieldValues } from "react-hook-form";
import { IUsuario } from "@/interfaces/interfacesBooks";
import { setUsuario } from "@/redux/usuario";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { IGlobal } from "@/interfaces/globalState";

interface ILoginProps {
  setUser: (user: IUsuario) => void;
}

const Login = ({ setUser }: ILoginProps) => {
  const router = useRouter();
  const { register, watch, handleSubmit } = useForm();

  const onSubmit = (e: FieldValues) => {
    fetch("/api/usuarios/login", {
      method: "POST",
      body: JSON.stringify(e),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUser(data.user);
          localStorage.setItem("autenticado", "true");
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success(data.message);
          router.push("/inicio");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <form
        className="flex flex-col justify-center gap-4 bg-white rounded-md p-5 h-[600px] w-[400px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center">
          <div className="flex flex-col w-[100px] items-center justify-center bg-primary rounded-md shadow-md">
            <Image src={Logo} alt="Logo" width={100} height={100} />
          </div>
        </div>

        <TextField
          label="Correo"
          placeholder="Correo"
          value={watch("correo")}
          type={"text"}
          isLabel={false}
          {...register("correo")}
        />

        <TextField
          label="Password"
          placeholder="Password"
          value={watch("password")}
          type={"text"}
          isLabel={false}
          {...register("password")}
        />

        <button type="submit" className="bg-primary text-white p-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: IGlobal) => {
  return {
    usuario: state.usuario,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUser: (user: IUsuario) => dispatch(setUsuario(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
