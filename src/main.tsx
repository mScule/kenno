import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/specific/App/index.tsx";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/index.ts";

import "./assets/fonts/roboto/font.css";
import "./assets/fonts/roboto-mono/font.css";

import "./assets/global-styles/colors.css";
import "./assets/global-styles/fonts.css";
import "./assets/global-styles/propotions.css";
import "./assets/global-styles/theme.css";

import "./assets/global-styles/style.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
