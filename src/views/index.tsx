"use client";

import Header from "@/component/Header/Header";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Index = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("autenticado")) {
      setIsLogin(true);
    }
  }, [children]);

  return (
    <>
      {isLogin && <Header />}
      {children}
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
};

export default Index;
