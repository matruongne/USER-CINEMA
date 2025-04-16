import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/header";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/footer";
import QuickBooking from "./components/QuickBooking/quickbooking";
import Showtimes from "./components/Showtime/Showtime";
import MovieList from "./components/MovieList/MovieList";
import Booking from "./pages/Booking";
import ServiceDetail from "./pages/ServiceDetail";
import EventRentalPage from "./pages/EventRentalPage";
import AboutUs from "./pages/AboutUs";
import PromotionsList from "./components/Promotion/PromotionsList";
import PromotionDetail from "./components/Promotion/PromotionDetail";
import EntertainmentList from "./components/Entertainment/EntertainmentList";
import EntertainmentDetail from "./components/Entertainment/EntertainmentDetail";
import Food from "./pages/Food";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import AuthPage from "./components/auth/AuthPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <div className="bg-[#0C1C36] min-h-screen text-white flex flex-col">
        {/* Header */}
        <Header />

        {/* Nội dung chính */}
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <QuickBooking />
                  <Home />
                </>
              }
            />
            <Route path="/cinemas" element={<Showtimes />} />
            <Route path="/cinemas/:slug" element={<Showtimes />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/service/:service" element={<ServiceDetail />} />
            <Route
              path="/service-detail/:service"
              element={<ServiceDetail />}
            />
            <Route path="/event-rental" element={<EventRentalPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/promotions" element={<PromotionsList />} />
            <Route path="/promotion/:id" element={<PromotionDetail />} />
            <Route path="/entertainment" element={<EntertainmentList />} />
            <Route
              path="/entertainment/:id"
              element={<EntertainmentDetail />}
            />
            <Route path="/food" element={<Food />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
