import React, { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import style from "./Form.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../actions/actions";
export function Form(props) {
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    lifespan: "",
    temperaments: [],
    optionstatus: 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    lifespan: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const contenedor = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleInputChange = function (e) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
    });
    setErrors(valida({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSelect = function (e) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        [e.target.name]: [...prevInput[e.target.name], e.target.value],
      };
    });
  };

  const tempDelete = function (temp) {
    const filteredTemp = input.temperaments.filter((t) => t !== temp);
    setInput((prevInput) => {
      return {
        ...prevInput,
        temperaments: filteredTemp,
      };
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const doggo = await Axios.post(
      "https://hidden-fortress-17520.herokuapp.com/dog/",
      input
    );
    alert("Raza creada");
    history.push("/home");
  };

  const disabledSubmit = useMemo(() => {
    if (
      input.name.length > 0 &&
      input.height.length > 0 &&
      input.weight.length > 0 &&
      input.lifespan.length > 0
    ) {
      valida(input);
      return false;
    }
    return true;
  }, [input]);

  function valida(input) {
    let errors = {};
    if (!/^[a-zA-Z\s]{1,254}$/.test(input.name)) {
      errors.name = "El nombre solo debe tener letras";
      console.log(errors.name, "esto tiene que devolver");
    }
    if (input.height.length) {
      if (!/^[0-9]{2}([-])[0-9]{2}$/.test(input.height)) {
        console.log(input.height.length, "esto tiene que devolver");
        errors.height = "Por favor ponga la altura en el formato correcto";
      } else if (input.height.slice(0, 2) >= input.height.slice(-2)) {
        console.log(errors.name, "esto tiene que devolver");
        errors.height = "Por favor ponga la altura en el formato correcto";
      }
    }
    if (input.weight.length) {
      if (!/^[0-9]{2}([-])[0-9]{2}$/.test(input.weight)) {
        errors.weight = "Por favor ponga el peso en el formato correcto";
      } else if (input.weight.slice(0, 2) >= input.weight.slice(-2)) {
        errors.weight = "Por favor ponga el peso en el formato correcto";
      }
    }
    if (input.lifespan.length) {
      if (!/^[0-9]{2}([-])[0-9]{2}$/.test(input.lifespan)) {
        errors.lifespan =
          "Por favor ponga la longevidad en el formato correcto";
      } else if (input.lifespan.slice(0, 2) >= input.lifespan.slice(-2)) {
        errors.lifespan =
          "Por favor ponga la longevidad en el formato correcto";
      }
    }
    return errors;
  }

  return (
    <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input
          autoComplete="off"
          placeholder="Nombre"
          type="text"
          name="name"
          onChange={handleInputChange}
          value={input.name}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <input
          autoComplete="off"
          placeholder="Altura min-max Ej:50-70"
          type="text"
          name="height"
          onChange={handleInputChange}
          value={input.height}
        />
        {errors.height && <p>{errors.height}</p>}
      </div>
      <div>
        <input
          autoComplete="off"
          placeholder="Peso min-max Ej:08-15"
          type="text"
          name="weight"
          onChange={handleInputChange}
          value={input.weight}
        />
        {errors.weight && <p>{errors.weight}</p>}
      </div>
      <div>
        <div>
          <input
            autoComplete="off"
            placeholder="Longevidad min-max"
            type="text"
            name="lifespan"
            onChange={handleInputChange}
            value={input.lifespan}
          />
          {errors.lifespan && <p>{errors.lifespan}</p>}
        </div>
      </div>
      <div>
        <select name="temperaments" onChange={handleSelect}>
          <option key={"h"} value={"default"} selected disabled>
            Elija sus temperamentos
          </option>
          {contenedor.map((e) => {
            return (
              <option key={e.id} value={e.temperaments}>
                {e.temperament}
              </option>
            );
          })}
        </select>
        <div>
          Temperamentos:
          {input.temperaments.map((f, i) => {
            return (
              <span>
                {`${f}, `}
                <button
                  type="button"
                  key={i}
                  value={f}
                  onClick={() => tempDelete(f)}
                >
                  X
                </button>
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <button type="submit" disabled={disabledSubmit}>
          Crear Raza
        </button>
      </div>
    </form>
  );
}
