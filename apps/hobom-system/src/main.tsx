import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";

import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("root element not found");

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
