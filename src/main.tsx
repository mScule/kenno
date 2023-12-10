import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/index.tsx";

import "./assets/fonts/roboto/font.css";
import "./assets/fonts/roboto-mono/font.css";

import "./assets/global-styles/colors.css";
import "./assets/global-styles/fonts.css";
import "./assets/global-styles/propotions.css";
import "./assets/global-styles/theme.css";

import "./assets/global-styles/style.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
