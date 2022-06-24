import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
export default function Card({
  id,
  name,
  image,
  height,
  weight,
  lifeSpan,
  temperaments,
}) {
  return (
    <div className={style.contenedor}>
      <h4>{name}</h4>
      <div className={style.image}>
        <img src={image} width="60px" height="60px" alt="" />
      </div>
      <div className={style.informacion}>
        {height ? <h6>Height:{" " + height + " cm."}</h6> : <span></span>}
        <h6>Weight:{" " + weight + " kgs."}</h6>
        <h6>Temperaments:{" " + temperaments + "."}</h6>
        {lifeSpan ? (
          <h6>Life Span:{" " + lifeSpan + "."}</h6>
        ) : (
          <Link to={`/dogs/${id}`}>
            <button>Ver Perfil</button>
          </Link>
        )}
      </div>
    </div>
  );
}
