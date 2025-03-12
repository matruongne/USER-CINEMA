import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/header";
import Banner from "./components/Banner/Banner";
import QuickBooking from "./components/QuickBooking/quickbooking";
import Showtimes from "./components/Showtime/Showtime"; 

const App = () => {
    return (
      <Router>
        <div className="bg-[#0C1C36] min-h-screen text-white">
          <Header />
          <Routes>
            <Route path="/" element={<><Banner /><QuickBooking /><Home /></>} />
            <Route path="/showtime" element={<Showtimes />} />
          </Routes>
        </div>
      </Router>
    );
  };

export default App;
