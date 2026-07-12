import { Route, Routes } from "react-router-dom";
import { LandingPage } from "@/pages/landing";

/**
 * Public routing. Only the landing page is open to guests; the rest of the
 * product will live behind auth as later phases land.
 */
export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
  </Routes>
);
