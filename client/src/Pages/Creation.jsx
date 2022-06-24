import React from "react";
import { Form } from "../components/Form/Form";
import Footer from "../components/NavBar/Footer";
import NavBarExtra from "../components/NavBar/NavBarExtra";
import style from "./style.module.css";

function Creation() {
  return (
    <div className={style.BGP}>
      <NavBarExtra />
      <div className={style.auxFormC}>
        <div className={style.formContainer}>
          <Form />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Creation;
