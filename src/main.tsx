import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";

import RootRoute from "./root-route";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootRoute />
    </BrowserRouter>
  </React.StrictMode>,
);
