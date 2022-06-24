// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import NavBarExtra from "./components/NavBar/NavBarExtra";

configure({ adapter: new Adapter() });

describe("<NavBarExtra/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavBarExtra />);
  });

  it("Deberia renderizar Dos <Link />", () => {
    expect(wrapper.find(Link)).toHaveLength(2);
  });
  it('El primer Link debe tener el texto "Henry Dogs App" y cambiar la ruta hacia "/home".', () => {
    expect(wrapper.find(Link).at(0).prop("to")).toEqual("/home");
    expect(wrapper.find(Link).at(0).text()).toEqual("Henry Dogs App");
  });
  it('El segundo Link debe tener el texto "Crear Raza" y cambiar la ruta hacia "/dog"', () => {
    expect(wrapper.find(Link).at(1).prop("to")).toEqual("/dog");
    expect(wrapper.find(Link).at(1).text()).toEqual("Crear Raza");
  });
});
