"use client";

import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

import Logo from "../../../public/Logo.png";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const handleLogout = () => {
    localStorage.removeItem("autenticado");
    localStorage.removeItem("user");
    window.location.reload();
  };

  if (active) {
    return (
      <div className="fixed hrefp-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-primary">
        <div className="absolute hrefp-8 right-8" onClick={handleClick}>
          <IoClose color={"white"} width={32} />
        </div>

        <ul className="text-white">
          <li className="p-4 text-lg font-bold text-center">
            <Link href={"/inicio"}>Inicio</Link>
          </li>
          <li className="p-4 text-lg font-bold text-center">
            <Link href={"/biblioteca"}>Biblioteca</Link>
          </li>
          <li className="p-4 text-lg font-bold text-center">
            <Link href={"/videoteca"}>Videoteca</Link>
          </li>
          <li className="p-4 text-lg font-bold text-center">
            <Link href={"/libros"}>Libros</Link>
          </li>
          <li className="p-4 text-lg font-bold text-center">
            <Link href={"/pelicula"}>Película</Link>
          </li>
          <li className="p-4 text-lg font-bold text-center">
            <Link href={"/usuario"}>Usuarios</Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <>
      <header className="flex flex-row items-center justify-between w-screen px-4 bg-primary">
        <div onClick={handleClick} className="lg:hidden">
          <RxHamburgerMenu color={"white"} width={32} />
        </div>

        <nav className="hidden lg:flex text-white">
          <ul className="flex flex-row">
            <li className="p-4 text-lg font-bold text-center">
              <Link href={"/inicio"}>Inicio</Link>
            </li>
            <li className="p-4 text-lg font-bold text-center">
              <Link href={"/biblioteca"}>Biblioteca</Link>
            </li>
            <li className="p-4 text-lg font-bold text-center">
              <Link href={"/videoteca"}>Videoteca</Link>
            </li>
            <li className="p-4 text-lg font-bold text-center">
              <Link href={"/libros"}>Libros</Link>
            </li>
            <li className="p-4 text-lg font-bold text-center">
              <Link href={"/pelicula"}>Película</Link>
            </li>
            <li className="p-4 text-lg font-bold text-center">
              <Link href={"/usuario"}>Usuarios</Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-row items-center justify-center gap-5">
          <section className="flex flex-row items-center justify-center text-secondary-a">
            <Image src={Logo} alt="Logo" width={80} height={80} />
            <h1 className="text-white">Centro Documental</h1>
          </section>
          <CiLogout
            onClick={handleLogout}
            size={35}
            color="white"
            className="cursor-pointer"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
