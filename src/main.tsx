import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/index.tsx";

import "./assets/fonts/roboto/font.css";
import "./assets/fonts/roboto-mono/font.css";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
