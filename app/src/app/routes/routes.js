import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Calculadora from "./pages/Calculadora";
import Blog from "./pages/Blog";
import { Navbar } from "./components/Navbar";

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}
