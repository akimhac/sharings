import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";

const Login = () => <div className="section container-page">Login</div>;
const Signup = () => <div className="section container-page">Signup</div>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
