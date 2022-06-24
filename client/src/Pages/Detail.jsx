import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBreed } from "../actions/actions";
import Card from "../components/Card/Card";
import Footer from "../components/NavBar/Footer";
import NavBarExtra from "../components/NavBar/NavBarExtra";
import style from "./style.module.css";
function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBreed(id));
  }, [dispatch, id]);
  const breed = useSelector((state) => state.breed);
  return (
    <div className={style.BGP}>
      <NavBarExtra />
      <div className={style.auxFormC}>
        <div className={style.formContainer}>
          <div className={style.card}>
            <Card
              name={breed.name}
              weight={breed.weight}
              height={breed.height}
              image={breed.image}
              lifeSpan={breed.lifeSpan}
              temperaments={
                !breed.temperament ? breed.temperaments : breed.temperament
              }
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
