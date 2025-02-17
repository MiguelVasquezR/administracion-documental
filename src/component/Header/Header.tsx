"use client";

import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";

import Logo from "../../../public/Logo.png";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const isLogged = localStorage.getItem("autenticado");

  const handleLogout = () => {
    localStorage.removeItem("autenticado");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const desactiveMenu = () => {
    setActive(false);
  };

  if (active) {
    return (
      <div className="fixed hrefp-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-primary">
        <div className="absolute top-5 right-5" onClick={handleClick}>
          <IoClose color={"white"} size={28} />
        </div>

        <ul className="text-white">
          {isLogged && (
            <li className="p-4 text-lg font-bold text-center">
              <Link onClick={desactiveMenu} href={"/inicio"}>
                Inicio
              </Link>
            </li>
          )}

          <li className="p-4 text-lg font-bold text-center">
            <Link onClick={desactiveMenu} href={"/biblioteca"}>
              Biblioteca
            </Link>
          </li>
          <li className="p-4 text-lg font-bold text-center">
            <Link onClick={desactiveMenu} href={"/videoteca"}>
              Videoteca
            </Link>
          </li>

          {isLogged && (
            <li className="p-4 text-lg font-bold text-center">
              <Link onClick={desactiveMenu} href={"/libros"}>
                Libros
              </Link>
            </li>
          )}
          {isLogged && (
            <li className="p-4 text-lg font-bold text-center">
              <Link onClick={desactiveMenu} href={"/pelicula"}>
                Película
              </Link>
            </li>
          )}
          {isLogged && (
            <li className="p-4 text-lg font-bold text-center">
              <Link onClick={desactiveMenu} href={"/usuario"}>
                Usuarios
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }

  return (
    <>
      <header className="flex flex-row items-center justify-between w-screen px-4 bg-primary">
        <div onClick={handleClick} className="lg:hidden">
          <RxHamburgerMenu color={"white"} size={28} />
        </div>

        <nav className="hidden lg:flex text-white">
          <ul className="flex flex-row">
            {isLogged && (
              <li className="p-4 text-lg font-bold text-center">
                <Link href={"/inicio"}>Inicio</Link>
              </li>
            )}

            <li className="p-4 text-lg font-bold text-center">
              <Link href={"/biblioteca"}>Biblioteca</Link>
            </li>
            <li className="p-4 text-lg font-bold text-center">
              <Link href={"/videoteca"}>Videoteca</Link>
            </li>

            {isLogged && (
              <li className="p-4 text-lg font-bold text-center">
                <Link href={"/libros"}>Libros</Link>
              </li>
            )}
            {isLogged && (
              <li className="p-4 text-lg font-bold text-center">
                <Link href={"/pelicula"}>Película</Link>
              </li>
            )}
            {isLogged && (
              <li className="p-4 text-lg font-bold text-center">
                <Link href={"/usuario"}>Usuarios</Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex flex-row items-center justify-center gap-5">
          <section className="flex flex-row items-center justify-center text-secondary-a">
            <Image src={Logo} alt="Logo" width={80} height={80} />
            <h1 className="text-white">Centro Documental</h1>
          </section>
          {!isLogged && (
            <Link
              href={"/login"}
              className="flex flex-col justify-center items-center gap-1 cursor-pointer"
            >
              <CiLogin onClick={handleLogout} size={24} color="white" />
              <p className="text-white text-[12px]">Iniciar Sesión</p>
            </Link>
          )}
          {isLogged && (
            <CiLogout
              onClick={handleLogout}
              size={35}
              color="white"
              className="cursor-pointer"
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
