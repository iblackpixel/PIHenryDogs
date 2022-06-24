import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card/Card";
import Footer from "../components/NavBar/Footer";
import NavBar from "../components/NavBar/NavBar";
import Paginado from "../components/NavBar/Paginado";
import { getDogs, getTemperaments } from "../actions/actions";
import style from "./style.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [door, setDoor] = useState(0);
  const [door2, setDoor2] = useState(1);
  const [totalDogs, setTotalDogs] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    const filtDogs = [...allDogs].sort(function (a, b) {
      if (b.name > a.name) return -1;
    });
    setTotalDogs(filtDogs);
  }, [setTotalDogs, allDogs]);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastDog = currentPage * 8;
  const indexOfFirstDog = indexOfLastDog - 8;

  const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  const handleSelect = function (e) {
    // eslint-disable-next-line array-callback-return
    let filteredTemp = allDogs.filter((d) => {
      if (d.temperament) {
        if (d.temperament.includes(e.target.value)) return d;
      }
    });

    setTotalDogs(filteredTemp);
  };

  const handleWeightSort = function () {
    if (door === 0) {
      const byWeight = [...totalDogs].sort(function (a, b) {
        return a.weight.slice(-2) - b.weight.slice(-2);
      });
      setTotalDogs(byWeight);
      setDoor(1);
    } else {
      // eslint-disable-next-line array-callback-return
      const filtDogs = [...totalDogs].sort(function (a, b) {
        if (b.name > a.name) return -1;
      });
      setTotalDogs(filtDogs);
      setDoor(0);
    }
  };

  const handleChecked = function () {
    if (checked === false) {
      if (checked2 === false) {
        let filteredBreeds = allDogs.filter(
          (p) => p.id.toString().includes("b") === false
        );
        setTotalDogs(filteredBreeds);
        if (door === 1) {
          handleWeightSort();
        }
      } else {
        setTotalDogs(allDogs);
        if (door === 1) {
          handleWeightSort();
        }
      }
      return setChecked(true);
    } else {
      if (checked2 === false) {
        setTotalDogs(allDogs);
        if (door === 1) {
          handleWeightSort();
        }
      } else {
        let filteredBreeds = allDogs.filter(
          (p) => p.id.toString().includes("b") === true
        );
        setTotalDogs(filteredBreeds);

        if (door === 1) {
          handleWeightSort();
        }
      }
      return setChecked(false);
    }
  };
  const handleChecked2 = function () {
    if (checked2 === false) {
      if (checked === false) {
        let filteredBreeds = allDogs.filter(
          (p) => p.id.toString().includes("b") === true
        );
        setTotalDogs(filteredBreeds);
        if (door === 1) {
          handleWeightSort();
        }
      } else {
        setTotalDogs(allDogs);
        if (door === 1) {
          handleWeightSort();
        }
      }
      return setChecked2(true);
    } else {
      if (checked === false) {
        setTotalDogs(allDogs);
      } else {
        let filteredBreeds = allDogs.filter(
          (p) => p.id.toString().includes("b") === false
        );
        setTotalDogs(filteredBreeds);
        if (door === 1) {
          handleWeightSort();
        }
      }
      return setChecked2(false);
    }
  };
  const onSearch = function (breed) {
    if (breed.length) {
      const searchedBreeds = [...allDogs].filter((e) =>
        e.name.toLowerCase().includes(breed.toLowerCase())
      );
      if (searchedBreeds.length === 0)
        alert("No existe ninguna raza que coincida");
      setTotalDogs(searchedBreeds);
    }
  };

  return (
    <div className={style.BGP}>
      <NavBar onSearch={onSearch} />
      <div className={style.filters2}>
        <div className={style.filters}>
          <div>
            {door === 0 ? (
              <button onClick={() => handleWeightSort()}>Peso</button>
            ) : (
              <button onClick={(door) => handleWeightSort()}>A-Z</button>
            )}
            {door2 === 1 ? (
              <button
                onClick={() => {
                  setDoor2(0);
                }}
              >
                Ascendente
              </button>
            ) : (
              <button
                onClick={() => {
                  setDoor2(1);
                }}
              >
                Descendente
              </button>
            )}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChecked}
              />
              Razas Conocidas
            </label>
            <label>
              <input
                type="checkbox"
                checked={checked2}
                onChange={handleChecked2}
              />
              Nuevas Razas
            </label>
          </div>

          <div>
            <select
              name="temperaments"
              placeholder="Filtre por temperamento"
              onChange={handleSelect}
            >
              <option key={"h"} value={"default"}>
                Filtre por temperamento
              </option>
              {allTemperaments.map((e) => {
                return (
                  <option key={e.id} value={e.temperament}>
                    {e.temperament}
                  </option>
                );
              })}
            </select>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Filtros Off
            </button>
          </div>
        </div>
      </div>
      <div className={style.dogcontainer}>
        {door2 === 1
          ? totalDogs.slice(indexOfFirstDog, indexOfLastDog).map((e) => {
              return (
                <Card
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  weight={e.weight}
                  image={e.image}
                  temperaments={e.temperament}
                />
              );
            })
          : totalDogs
              .slice(
                totalDogs.length -
                  (indexOfLastDog < totalDogs.length
                    ? indexOfLastDog
                    : totalDogs.length),
                totalDogs.length - indexOfFirstDog
              )
              .reverse()
              .map((e) => {
                return (
                  <Card
                    key={e.id}
                    id={e.id}
                    name={e.name}
                    weight={e.weight}
                    image={e.image}
                    temperaments={e.temperament}
                  />
                );
              })}
      </div>
      <Paginado totalDogs={totalDogs.length} paginado={paginado} />
      <Footer />
    </div>
  );
}
