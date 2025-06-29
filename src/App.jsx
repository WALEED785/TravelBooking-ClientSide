// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


import About from "../public/pages/About";
import Magzine from "../public/pages/Magzine";
import Destination from "../public/pages/Destination";
import PlainTrip from "../public/pages/PlainTrip";
import Visa from "../public/pages/Visa";
import ParisTravelPage from "../public/pages/ParisTravelPage";
import Contact from "../public/pages/Contact";

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titles = {
      "/": "JETSETGO",
      "/plaintrip": "Plan Your Trip",
      "/about": "About Us",
      "/visa": "Visa Information",
      "/magzine": "Magazine",
      "/contact": "contact",
      "/ParisTravelPage": "Description",
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
        <Route path="/visa" element={<Visa />} />
        <Route path="/magzine" element={<Magzine />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ParisTravelPage" element={<ParisTravelPage />} />
      </Routes>
    </Router>
  );
}


export default App;
