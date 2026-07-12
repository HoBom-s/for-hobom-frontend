import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("root element not found");

createRoot(rootElement).render(
  // basename tracks Vite's `base` (/hobom-angel/) so routes work under the prefix.
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>,
);
