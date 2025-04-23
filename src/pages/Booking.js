import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import movieData from "../data/movies";
import "./Booking.css";

const Booking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("nowShowing");

  // Phân loại phim đang chiếu và sắp chiếu
  const nowShowingMovies = movieData.filter(
    (movie) => movie.status === "nowShowing"
  );
  const comingSoonMovies = movieData.filter(
    (movie) => movie.status === "comingSoon"
  );

  const handleMovieClick = (movie) => {
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="booking-container">
      {/* Booking Steps */}
      <div className="booking-steps">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-text">Chọn rạp</div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-text">Chọn phim</div>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-text">Chọn ngày</div>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <div className="step-text">Chọn suất</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`flex-1 px-6 py-4 text-2xl font-bold ${
            activeTab === "nowShowing"
              ? "border-b-4 border-[#FFD700] text-[#FFD700]"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("nowShowing")}
        >
          Phim Đang Chiếu
        </button>
        <button
          className={`flex-1 px-6 py-4 text-2xl font-bold ${
            activeTab === "comingSoon"
              ? "border-b-4 border-[#FFD700] text-[#FFD700]"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("comingSoon")}
        >
          Phim Sắp Chiếu
        </button>
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {(activeTab === "nowShowing" ? nowShowingMovies : comingSoonMovies).map(
          (movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-details">
                  <p>Thời lượng: {movie.duration}</p>
                  <p>Thể loại: {movie.genre}</p>
                  {movie.status === "nowShowing" }
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Booking;
