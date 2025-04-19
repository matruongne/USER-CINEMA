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
    <div className="container mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Đặt Vé Xem Phim</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-6 py-3 text-lg font-semibold ${
            activeTab === "nowShowing"
              ? "border-b-2 border-[#FFD700] text-[#FFD700]"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("nowShowing")}
        >
          Phim Đang Chiếu
        </button>
        <button
          className={`px-6 py-3 text-lg font-semibold ${
            activeTab === "comingSoon"
              ? "border-b-2 border-[#FFD700] text-[#FFD700]"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("comingSoon")}
        >
          Phim Sắp Chiếu
        </button>
      </div>

      {/* Danh sách phim */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(activeTab === "nowShowing" ? nowShowingMovies : comingSoonMovies).map(
          (movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="relative aspect-[2/3]">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {movie.status === "comingSoon" && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sắp Chiếu
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-[#FFD700]">
                  {movie.title}
                </h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>
                    <span className="font-semibold">Thời lượng:</span>{" "}
                    {movie.duration}
                  </p>
                  <p>
                    <span className="font-semibold">Thể loại:</span>{" "}
                    {movie.genre}
                  </p>
                  {movie.status === "nowShowing" && (
                    <p>
                      <span className="font-semibold">Giá vé:</span> 75.000đ
                    </p>
                  )}
                </div>
                {movie.status === "nowShowing" && (
                  <button className="mt-4 w-full bg-[#FFD700] text-black font-bold py-2 rounded-lg hover:bg-[#FFC107] transition-colors">
                    Đặt Vé Ngay
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Booking;
