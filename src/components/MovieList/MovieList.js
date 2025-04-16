import React from "react";
import { useNavigate } from "react-router-dom";
import movies from "../../data/movies";

const MoviesList = () => {
  const navigate = useNavigate();

  const handleBooking = (movie) => {
    navigate(`/booking/${movie.id}`, {
      state: {
        movie,
        selectedSeats: [],
        selectedTime: "",
        totalPrice: 0,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Phim Đang Chiếu</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-gray-800 rounded-xl shadow-md overflow-hidden group cursor-pointer"
            onClick={() => handleBooking(movie)}
          >
            {/* Poster phim với tỉ lệ 2:3 */}
            <div className="w-full aspect-[2/3] overflow-hidden">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Overlay khi hover */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-2">
                  {movie.title}
                </h3>
                <p className="text-sm text-white mb-1">
                  {movie.duration} • {movie.releaseDate}
                </p>
                <p className="text-sm text-gray-300">
                  {movie.genre || "Thể loại chưa cập nhật"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
