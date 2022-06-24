import { GET_BREED, GET_DOGS, GET_TEMPERAMENTS } from "../constants/constants";

const initialState = {
  dogs: [],
  temperaments: [],
  breed: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return { ...state, dogs: action.payload };
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };
    case GET_BREED:
      return { ...state, breed: action.payload };
    default:
      return state;
  }
}
