// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import About from "../public/pages/About";
import Destination from "../public/pages/Destination";
import PlainTrip from "../public/pages/PlainTrip";
import Contact from "../public/pages/Contact";
import LoginRegister from "../public/pages/LoginRegister";
import TravelSearchPage from "../public/pages/TravelSearchPage";
import UserProfile from "../public/pages/UserProfile";
import BookingPage from "../public/pages/BookingPage";

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titles = {
      "/": "JETSETGO",
      "/plaintrip": "Plan Your Trip",
      "/about": "About Us",
      "/contact": "Contact",
      "/search": "AI Search",
      "/login": "Login",
      "/profile": "My Profile"
    };

    // Handle dynamic routes
    if (path.startsWith("/destination/")) {
      document.title = "Destination Details - JETSETGO";
    } else if (path.startsWith("/plaintrip/")) {
      document.title = "Trip Details - JETSETGO";
    } else if (path.startsWith("/booking/")) {
      document.title = "Complete Booking - JETSETGO";
    } else {
      document.title = titles[path] || "JETSETGO";
    }
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
        <Route path="/plaintrip/:destinationId" element={<PlainTrip />} />
        <Route path="/destination/:destinationId" element={<Destination />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<TravelSearchPage />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/booking/:type/:id" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;