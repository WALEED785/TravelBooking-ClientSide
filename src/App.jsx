// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


import About from "../public/pages/About";
import Destination from "../public/pages/Destination";
import PlainTrip from "../public/pages/PlainTrip";
import Contact from "../public/pages/Contact";
import LoginRegister from "../public/pages/LoginRegister";

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titles = {
      "/": "JETSETGO",
      "/plaintrip": "Plan Your Trip",
      "/about": "About Us",
      "/contact": "contact",
      "/login": "login",
    };

    document.title = titles[path] || "JETSETGO";
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <TitleManager /> {/* ← This makes titles dynamic */}
      <Routes>
        <Route path="/" element={<Destination />} />
        <Route path="/plaintrip" element={<PlainTrip />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/login" element={<LoginRegister />} /> 
      </Routes>
    </Router>
  );
}


export default App;
