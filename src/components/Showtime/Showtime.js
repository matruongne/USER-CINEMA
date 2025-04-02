import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import cinemas from "../../data/cinemas";

const movies = [
  {
    id: 1,
    title: "Godzilla x Kong: The New Empire",
    image: "/images/godzilla-kong.jpg",
    description:
      "Cuộc đối đầu hoành tráng giữa Godzilla và King Kong khi một thế lực mới trỗi dậy.",
    showtimes: {
      "14/03/2025": ["10:00", "13:00", "16:00", "19:00"],
      "15/03/2025": ["09:00", "11:30", "14:00", "17:30", "20:30"],
    },
  },
  {
    id: 2,
    title: "Dune: Part Two",
    image: "/images/dune2.jpg",
    description:
      "Paul Atreides tiếp tục hành trình của mình trên hành tinh cát Arrakis.",
    showtimes: {
      "14/03/2025": ["09:30", "12:30", "15:30", "18:30"],
      "15/03/2025": ["10:00", "13:15", "16:30", "19:45", "22:00"],
    },
  },
  {
    id: 3,
    title: "Deadpool & Wolverine",
    image: "/images/deadpool-wolverine.jpg",
    description:
      "Deadpool cùng Wolverine đối đầu với kẻ thù mới trong cuộc phiêu lưu đa vũ trụ.",
    showtimes: {
      "14/03/2025": ["11:00", "14:00", "17:00", "20:00"],
      "15/03/2025": ["10:15", "13:30", "16:45", "20:00", "22:30"],
    },
  },
  {
    id: 4,
    title: "Inside Out 2",
    image: "/images/inside-out2.jpg",
    description:
      "Những cảm xúc bên trong Riley đối mặt với những thử thách mới khi cô bé lớn lên.",
    showtimes: {
      "14/03/2025": ["08:30", "11:30", "14:30", "17:30"],
      "15/03/2025": ["09:00", "12:15", "15:30", "18:45", "21:00"],
    },
  },
];

const dates = ["14/03/2025", "15/03/2025"];

const Showtimes = () => {
  const [selectedCinema, setSelectedCinema] = useState(cinemas[0].id); // Sử dụng id thay vì slug
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Chọn rạp */}
      <div className="flex gap-4 mb-6">
        {cinemas.map((cinema) => (
          <Link key={cinema.id} to={`/cinemas/${cinema.slug}`}> {/* Sử dụng slug thay vì id */}
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCinema === cinema.id // So sánh bằng id
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-white hover:bg-yellow-500"
              }`}
              onClick={() => setSelectedCinema(cinema.id)} // Cập nhật id khi chọn rạp
            >
              {cinema.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Chọn ngày */}
      <div className="flex gap-4 mb-6">
        {dates.map((date) => (
          <button
            key={date}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedDate === date
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-white hover:bg-blue-400"
            }`}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </button>
        ))}
      </div>

      {/* Danh sách phim */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-32 h-48 object-cover rounded-md"
            />
            <div className="ml-4">
              <h3 className="text-xl font-bold">{movie.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{movie.description}</p>

              {/* Hiển thị suất chiếu theo ngày đã chọn */}
              <div className="mt-2 flex gap-2 flex-wrap">
                {movie.showtimes[selectedDate]?.length > 0 ? (
                  movie.showtimes[selectedDate].map((time, index) => (
                    <button
                      key={index}
                      className="bg-yellow-500 text-black font-semibold px-3 py-1 rounded-md hover:bg-yellow-400"
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p className="text-red-500">Không có suất chiếu</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showtimes;
