import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AnnoncesPage from "./pages/AnnoncesPage";
import NewAnnoncePage from "./pages/NewAnnoncePage";
import ProtectedRoute from "./components/ProtectedRoute";

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/annonces" element={<AnnoncesPage />} />
          <Route path="/annonces/new" element={<NewAnnoncePage />} />
        </Route>
      </Routes>
    </>
  );
}
