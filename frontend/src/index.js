import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
