import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<div />} />
      <Route path="/register" element={<div />} />
      <Route path="/recherche" element={<div />} />
      <Route path="/creer-annonce" element={<div />} />
      <Route path="/reservations" element={<div />} />
      <Route path="/messages" element={<div />} />
      <Route path="/contrat" element={<div />} />
    </Routes>
  );
}
