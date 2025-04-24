import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import movies from "../../data/movies";

const MoviesList = () => {
  const navigate = useNavigate();
  const [visibleMovies, setVisibleMovies] = useState(8);

  const handleBooking = (movie) => {
    navigate(`/booking/${movie.id}`);
  };

  const handleLoadMore = () => {
    setVisibleMovies((prevCount) => prevCount + 8);
  };

  const displayedMovies = movies.slice(0, visibleMovies);
  const hasMoreMovies = visibleMovies < movies.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Phim Đang Chiếu</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedMovies.map((movie) => (
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

      {hasMoreMovies && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full flex items-center"
          >
            <span className="mr-2">Xem thêm</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
