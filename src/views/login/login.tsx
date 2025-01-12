"use client";

import TextField from "@/component/TextField/TextField";
import Logo from "../../../public/Logo.png";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      toast.error("Por favor, ingrese un email y contraseña");
      return;
    }

    fetch("/api/usuarios/login", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("autenticado", "true");
          localStorage.setItem("user", JSON.stringify(data.user.correo));
          toast.success(data.message);
          router.push("/inicio");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <form
        className="flex flex-col justify-center gap-4 bg-white rounded-md p-5 h-[600px] w-[400px]"
        onSubmit={onSubmit}
      >
        <div className="flex justify-center">
          <div className="flex flex-col w-[100px] items-center justify-center bg-primary rounded-md shadow-md">
            <Image src={Logo} alt="Logo" width={100} height={100} />
          </div>
        </div>
        <TextField
          label="Email"
          placeholder="Email"
          type="text"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e });
          }}
        />
        <TextField
          value={user.password}
          label="Password"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setUser({ ...user, password: e });
          }}
        />
        <button type="submit" className="bg-primary text-white p-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
