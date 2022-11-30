import React from "react";
import "../src/css/App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

import axios from "axios";

//config axios base url default
// axios.defaults.baseURL = "https://tp-bookstore.herokuapp.com/";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
