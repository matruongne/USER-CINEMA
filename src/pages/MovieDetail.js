import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import movies from "../data/movies";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Phải gọi bên trong function component

  const movie = movies.find((m) => m.id === id); // Tìm phim theo id

  if (!movie) {
    return <div className="text-center text-red-500">Phim không tồn tại</div>;
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="flex">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-1/3 rounded-md"
        />
        <div className="ml-6">
          <h1 className="text-4xl font-bold">
            {movie.title} ({movie.rating})
          </h1>
          <p>
            <strong>Thời lượng:</strong> {movie.duration}
          </p>
          <p>
            <strong>Quốc gia:</strong> {movie.country}
          </p>
          <p>
            <strong>Khởi chiếu:</strong> {movie.releaseDate}
          </p>
          <p>
            <strong>Đạo diễn:</strong> {movie.director}
          </p>
          <p>
            <strong>Diễn viên:</strong> {movie.cast.join(", ")}
          </p>
          <p className="mt-4">{movie.description}</p>

          <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
            <button className="mt-4 bg-red-600 px-4 py-2 rounded-md">
              Xem Trailer
            </button>
          </a>

          <button
            className="mt-4 bg-yellow-500 px-4 py-2 rounded-md ml-4"
            onClick={() => navigate(`/booking/${movie.id}`)}
          >
            Đặt Vé Ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
