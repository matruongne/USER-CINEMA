import React, { useState } from "react";

const cinemas = [
  { id: 1, name: "Cinestar Quốc Thanh" },
  { id: 2, name: "Cinestar Huế" },
  { id: 3, name: "Cinestar Đà Lạt" },
  { id: 4, name: "Cinestar Mỹ Tho" },
];

const movies = [
  {
    id: 1,
    title: "Godzilla x Kong: The New Empire",
    image: "/images/godzilla-kong.jpg",
    description: "Cuộc đối đầu hoành tráng giữa Godzilla và King Kong khi một thế lực mới trỗi dậy.",
    showtimes: ["10:00", "13:00", "16:00", "19:00"],
  },
  {
    id: 2,
    title: "Dune: Part Two",
    image: "/images/dune2.jpg",
    description: "Paul Atreides tiếp tục hành trình của mình trên hành tinh cát Arrakis.",
    showtimes: ["09:30", "12:30", "15:30", "18:30"],
  },
  {
    id: 3,
    title: "Deadpool & Wolverine",
    image: "/images/deadpool-wolverine.jpg",
    description: "Deadpool cùng Wolverine đối đầu với kẻ thù mới trong cuộc phiêu lưu đa vũ trụ.",
    showtimes: ["11:00", "14:00", "17:00", "20:00"],
  },
  {
    id: 4,
    title: "Inside Out 2",
    image: "/images/inside-out2.jpg",
    description: "Những cảm xúc bên trong Riley đối mặt với những thử thách mới khi cô bé lớn lên.",
    showtimes: ["08:30", "11:30", "14:30", "17:30"],
  },
];

const Showtimes = () => {
  const [selectedCinema, setSelectedCinema] = useState(cinemas[0].id);

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Chọn rạp */}
      <div className="flex gap-4 mb-6">
        {cinemas.map((cinema) => (
          <button
            key={cinema.id}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCinema === cinema.id
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 text-white hover:bg-yellow-500"
            }`}
            onClick={() => setSelectedCinema(cinema.id)}
          >
            {cinema.name}
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
              <div className="mt-2 flex gap-2 flex-wrap">
                {movie.showtimes.map((time, index) => (
                  <button
                    key={index}
                    className="bg-yellow-500 text-black font-semibold px-3 py-1 rounded-md hover:bg-yellow-400"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showtimes;
