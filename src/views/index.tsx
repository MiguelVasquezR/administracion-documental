"use client";

import Header from "@/component/Header/Header";
import { IGlobal } from "@/interfaces/globalState";
import { IUsuario } from "@/interfaces/interfacesBooks";
import { setUsuario } from "@/redux/usuario";
import { Dispatch } from "@reduxjs/toolkit";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { connect } from "react-redux";

interface IndexProps {
  children: React.ReactNode;
  usuario: IUsuario;
  setUser: (user: IUsuario) => void;
}

const Index = ({ children, usuario, setUser }: IndexProps) => {
  const path = usePathname();
  

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!usuario) {
      setUser(user ? JSON.parse(user) : null);
    }
  }, [usuario]);

  return (
    <>
      {!path.includes("login") && <Header />}
      {children}
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
};

const mapStateToProps = (state: IGlobal) => {
  return {
    usuario: state.user.usuario,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUser: (user: IUsuario) => dispatch(setUsuario(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
