import axios from "axios";
import {
  GET_BREED,
  GET_DOGS,
  GET_DOGS_ERROR,
  GET_TEMPERAMENTS,
  GET_TEMPERAMENTS_ERROR,
} from "../constants/constants";

const puertoBack = "http://localhost:3001/";

export const getDogs = () => async (dispatch) => {
  try {
    const json = await axios.get(`${puertoBack}dogs`);

    dispatch({
      type: GET_DOGS,
      payload: json.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DOGS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBreed = (id) => async (dispatch) => {
  try {
    const json = await axios.get("http://localhost:3001/dogs/" + id);
    dispatch({
      type: GET_BREED,
      payload: json.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTemperaments = () => async (dispatch) => {
  try {
    const json = await axios.get(`${puertoBack}temperament`);

    dispatch({
      type: GET_TEMPERAMENTS,
      payload: json.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TEMPERAMENTS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
