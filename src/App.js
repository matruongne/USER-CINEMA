import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/header";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/footer";
import QuickBooking from "./components/QuickBooking/quickbooking";
import Showtimes from "./components/Showtime/Showtime";
import MovieList from "./components/MovieList/MovieList";
import MovieDetail from "./pages/MovieDetail";
import Booking from "./pages/Booking";
import ServiceDetail from "./pages/ServiceDetail";
import EventRentalPage from "./pages/EventRentalPage";
import AboutUs from "./pages/AboutUs"
import PromotionsList from "./components/Promotion/PromotionsList";
import PromotionDetail from "./components/Promotion/PromotionDetail";
import EntertainmentList from "./components/Entertainment/EntertainmentList";
import EntertainmentDetail from "./components/Entertainment/EntertainmentDetail";
import Food from "./pages/Food";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import AuthPage from "./pages/AuthPage";

const App = () => {
    return (
      <Router>
        <div className="bg-[#0C1C36] min-h-screen text-white flex flex-col">
          {/* Header */}
          <Header />

          {/* Nội dung chính */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<><Banner /><QuickBooking /><Home /></>} />
              <Route path="/cinemas" element={<Showtimes />} />
              <Route path="/cinemas/:slug" element={<Showtimes />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/service/:service" element={<ServiceDetail />} />
              <Route path="/service-detail/:service" element={<ServiceDetail />} />
              <Route path="/event-rental" element={<EventRentalPage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/promotions" element={<PromotionsList />} />
              <Route path="/promotion/:id" element={<PromotionDetail />} />
              <Route path="/entertainment" element={<EntertainmentList />} />
              <Route path="/entertainment/:id" element={<EntertainmentDetail />} />
              <Route path="/food" element={<Food />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              <Route path="/auth" element={<AuthPage />} />
              {/* <Route path="/auth/login" element={<AuthPage />} />
              <Route path="/auth/register" element={<AuthPage />} />
              <Route path="/movies/:category" element={<MovieList />} />
              <Route path="/food/:category" element={<Food />} />
              <Route path="/food/:category/:id" element={<Food />} />
              <Route path="/movie/:id/booking" element={<Booking />} />
              <Route path="/movie/:id/checkout" element={<Checkout />} />
              <Route path="/movie/:id/checkout-success" element={<CheckoutSuccess />} />
              <Route path="/movie/:id/food" element={<Food />} />
              <Route path="/movie/:id/food/:category" element={<Food />} />
              <Route path="/movie/:id/food/:category/:foodId" element={<Food />} />
              <Route path="/movie/:id/entertainment" element={<EntertainmentList />} />
              <Route path="/movie/:id/entertainment/:entertainmentId" element={<EntertainmentDetail />} />
              <Route path="/movie/:id/promotions" element={<PromotionsList />} />
              <Route path="/movie/:id/promotion/:promotionId" element={<PromotionDetail />} />
              <Route path="/movie/:id/showtime" element={<Showtimes />} />
              <Route path="/movie/:id/showtime/:cinema" element={<Showtimes />} />
              <Route path="/movie/:id/showtime/:cinema/:date" element={<Showtimes />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time" element={<Showtimes />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat" element={<Showtimes />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/checkout" element={<Checkout />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/checkout-success" element={<CheckoutSuccess />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/food" element={<Food />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/food/:category" element={<Food />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/food/:category/:foodId" element={<Food />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/entertainment" element={<EntertainmentList />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/entertainment/:entertainmentId" element={<EntertainmentDetail />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/promotions" element={<PromotionsList />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/promotion/:promotionId" element={<PromotionDetail />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/event-rental" element={<EventRentalPage />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/about-us" element={<AboutUs />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/auth" element={<AuthPage />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/auth/login" element={<AuthPage />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/auth/register" element={<AuthPage />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/quick-booking" element={<QuickBooking />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/quick-booking" element={<QuickBooking />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/quick-booking/:category" element={<QuickBooking />} /> 
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/quick-booking/:category/:foodId" element={<QuickBooking />} />
              <Route path="/movie/:id/showtime/:cinema/:date/:time/:seat/quick-booking/:category/:foodId/checkout" element={<Checkout />} /> */}
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    );
};

export default App;
