import React from "react";
import { Link } from "react-router-dom";
import movies from "../../data/movies"; // Import data từ file

const MoviesList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Phim Đang Chiếu</h2>

      {/* Hiển thị danh sách phim từ file data */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />

            <div className="p-4 text-white">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-400">{movie.genre}</p>
              <p className="text-sm text-gray-400">{movie.duration} • {movie.releaseDate}</p>

              <Link to={`/movie/${movie.id}`}>
                <button className="mt-3 w-full bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-400 transition-all">
                  Xem Chi Tiết
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
