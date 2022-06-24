import { Route } from "react-router-dom";
import "./App.css";
import Landing from "../src/components/Landing/Landing.jsx";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import Creation from "./Pages/Creation";

function App() {
  return (
    <div className="App">
      <Route path="/" exact={true} component={Landing} />
      <Route path="/home" exact={true} component={Home} />
      <Route path="/dogs/:id" exact={true} component={Detail} />
      <Route path="/dog" exact={true} component={Creation} />
    </div>
  );
}

export default App;
