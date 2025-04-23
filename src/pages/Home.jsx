import React, { useEffect } from "react";
import MovieList from "../components/MovieList/MovieList";
import Schedule from "../components/Schedule/Schedule";
import EntertainmentList from "../components/Entertainment/EntertainmentList";
import Contact from "../components/contact/contact";

import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Phim Đang Chiếu</h2>
        <MovieList category="now-showing" />
        <h2 className="text-2xl font-bold mt-8 mb-4">Phim Sắp Chiếu</h2>
        <MovieList category="coming-soon" />
        <h2 className="text-2xl font-bold mt-8 mb-4">Lịch Chiếu</h2>
        <Schedule />
        <h2 className="text-2xl font-bold mt-8 mb-4">Giải Trí</h2>
        <EntertainmentList />
        <h2 className="text-2xl font-bold mt-8 mb-4">Liên Hệ</h2>
        <Contact />
      </div>
    </div>
  );
};

export default Home;
