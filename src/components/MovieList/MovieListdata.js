import React from "react";

const movies = [
  {
    id: 1,
    title: "Godzilla x Kong: The New Empire",
    image: "/images/godzilla-kong.jpg",
    showtimes: ["10:00", "13:00", "16:00", "19:00"],
  },
  {
    id: 2,
    title: "Dune: Part Two",
    image: "/images/dune2.jpg",
    showtimes: ["09:30", "12:30", "15:30", "18:30"],
  },
];

const MovieListData = ({ selectedCinema, selectedDate }) => {
  return (
    <div className="w-3/4">
      <h3 className="text-xl font-bold text-white mb-3">
        Lịch Chiếu Ngày {selectedDate}
      </h3>
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

export default MovieListData ;
