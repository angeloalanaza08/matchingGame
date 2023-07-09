import React, { StrictMode } from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import * as ServiceWorkerRegistration from "./serviceWorkerRegistration";

const root = document.getElementById("root");

render(
  <StrictMode>
    <App />
  </StrictMode>,
  root
);

ServiceWorkerRegistration.register();
