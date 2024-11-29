"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GasWrapper from "./components/gas-wrapper";
import { Navbar } from "./components/nav-bar";


export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<GasWrapper />} />
        <Route path="/calculadora" element={<GasWrapper />} />
        <Route path="/blog" element={<GasWrapper />} />
      </Routes>
    </Router>
  );
}