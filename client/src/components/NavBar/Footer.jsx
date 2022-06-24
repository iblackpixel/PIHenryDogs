import React from "react";
import style from "./style.module.css";
export default function Footer() {
  return (
    <div className={style.NavCont}>
      <div className={style.pocket}>
        <div className={style.footerbtn}>Henry Dogs</div>
        <div className={style.footerbtn}>Por Roque Iván Moyano</div>
      </div>
      <div className={style.pocket}>
        <a
          className={style.footerbtn}
          href="https://github.com/iblackpixel"
          target="_blank"
          rel="noreferrer"
        >
          Github{" "}
        </a>
        <a
          className={style.footerbtn}
          href="https://www.linkedin.com/in/roque-iván-moyano-a5b0b7203"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn{" "}
        </a>
      </div>
    </div>
  );
}
