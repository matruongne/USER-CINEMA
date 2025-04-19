import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import movies from "../../data/movies";
import cinemas from "../../data/cinemas";

const Showtimes = () => {
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Lấy danh sách ngày chiếu từ dữ liệu phim
  const dates = Object.keys(movies[0].showtimes);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Phần chọn rạp */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Chọn Rạp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cinemas.map((cinema) => (
            <Link
              key={cinema.id}
              to={`/showtime/${cinema.slug}`}
              className={`p-4 rounded-lg border ${
                selectedCinema?.id === cinema.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setSelectedCinema(cinema)}
            >
              <img
                src={cinema.image}
                alt={cinema.name}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h3 className="font-semibold">{cinema.name}</h3>
              <p className="text-sm text-gray-600">{cinema.address}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Phần chọn ngày */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Chọn Ngày</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {dates.map((date) => (
            <button
              key={date}
              className={`px-6 py-3 rounded-lg whitespace-nowrap ${
                selectedDate === date
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Phần hiển thị phim và suất chiếu */}
      <div className="space-y-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-3/4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Thể loại:</span>{" "}
                        {movie.genre}
                      </p>
                      <p>
                        <span className="font-semibold">Thời lượng:</span>{" "}
                        {movie.duration}
                      </p>
                      <p>
                        <span className="font-semibold">Đạo diễn:</span>{" "}
                        {movie.director}
                      </p>
                      <p>
                        <span className="font-semibold">Diễn viên:</span>{" "}
                        {movie.actors}
                      </p>
                      <p>
                        <span className="font-semibold">Khởi chiếu:</span>{" "}
                        {movie.releaseDate}
                      </p>
                      <p>
                        <span className="font-semibold">Đánh giá:</span>{" "}
                        {movie.rating}
                      </p>
                    </div>
                  </div>
                  <div className="md:ml-8">
                    <p className="text-sm text-gray-600 mb-4">
                      {movie.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDate &&
                        movie.showtimes[selectedDate]?.map((time, index) => (
                          <button
                            key={index}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            {time}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showtimes;
