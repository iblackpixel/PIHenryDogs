import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export default function NavBarExtra() {
  return (
    <nav className={style.navbar}>
      <Link to="/home">
        <span className={style.logo}>Henry Dogs App</span>
      </Link>
      <Link to="/dog">
        <span className={style.logosp}>Crear Raza</span>
      </Link>
    </nav>
  );
}
