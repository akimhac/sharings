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
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import SearchPage from "./pages/SearchPage"
import NewAnnoncePage from "./pages/NewAnnoncePage"
import BookingPage from "./pages/BookingPage"
import MessagingPage from "./pages/MessagingPage"
import ContractPage from "./pages/ContractPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/recherche" element={<SearchPage />} />
        <Route path="/creer-annonce" element={<NewAnnoncePage />} />
        <Route path="/reservations" element={<BookingPage />} />
        <Route path="/messages" element={<MessagingPage />} />
        <Route path="/contrat" element={<ContractPage />} />
      </Routes>
    </BrowserRouter>
  )
main
}
