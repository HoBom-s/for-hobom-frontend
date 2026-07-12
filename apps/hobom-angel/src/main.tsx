import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { startMocks } from "@/mocks";
import { warmApiOrigin } from "@/shared/lib";
import App from "./App";

import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("root element not found");

// Open the connection to the API origin early, in parallel with app bootstrap.
warmApiOrigin();

// Start the mock worker (when enabled) before the first render so no request
// escapes to a live backend during local dev or e2e.
void startMocks().then(() => {
  createRoot(rootElement).render(
    // basename tracks Vite's `base` (/hobom-angel/) so routes work under the prefix.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>,
  );
});
