import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import movies from "../../data/movies";
import cinemas from "../../data/cinemas";

const QuickBooking = () => {
  const navigate = useNavigate();
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableMovies, setAvailableMovies] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Lấy danh sách phim khi chọn rạp
  useEffect(() => {
    if (selectedCinema) {
      // Lọc phim đang chiếu
      const nowShowingMovies = movies.filter(
        (movie) => movie.status === "nowShowing"
      );
      setAvailableMovies(nowShowingMovies);
      // Reset các lựa chọn phụ thuộc
      setSelectedMovie("");
      setSelectedDate("");
      setSelectedTime("");
    }
  }, [selectedCinema]);

  // Lấy danh sách ngày chiếu khi chọn phim
  useEffect(() => {
    if (selectedMovie) {
      const movie = movies.find((m) => m.title === selectedMovie);
      if (movie) {
        const dates = Object.keys(movie.showtimes);
        setAvailableDates(dates);
        setSelectedDate("");
        setSelectedTime("");
      }
    }
  }, [selectedMovie]);

  // Lấy danh sách suất chiếu khi chọn ngày
  useEffect(() => {
    if (selectedMovie && selectedDate) {
      const movie = movies.find((m) => m.title === selectedMovie);
      if (movie && movie.showtimes[selectedDate]) {
        setAvailableTimes(movie.showtimes[selectedDate]);
        setSelectedTime("");
      }
    }
  }, [selectedMovie, selectedDate]);

  const handleBooking = () => {
    // Tìm movie object từ title
    const movie = movies.find((m) => m.title === selectedMovie);

    if (movie) {
      navigate(`/booking/${movie.id}`, {
        state: {
          selectedCinema,
          selectedDate,
          selectedTime,
        },
      });
    }
  };

  return (
    <div className="bg-secondary py-4 px-6 rounded-lg w-[90%] mx-auto mt-6 shadow-md">
      <h2 className="text-white text-2xl font-bold mb-4">ĐẶT VÉ NHANH</h2>
      <div className="grid grid-cols-5 gap-2 items-center">
        {/* Chọn Rạp */}
        <select
          className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
          value={selectedCinema}
          onChange={(e) => setSelectedCinema(e.target.value)}
        >
          <option value="">1. Chọn Rạp</option>
          {cinemas.map((cinema) => (
            <option key={cinema.id} value={cinema.name}>
              {cinema.name}
            </option>
          ))}
        </select>

        {/* Chọn Phim */}
        <select
          className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
          disabled={!selectedCinema}
        >
          <option value="">2. Chọn Phim</option>
          {availableMovies.map((movie) => (
            <option key={movie.id} value={movie.title}>
              {movie.title}
            </option>
          ))}
        </select>

        {/* Chọn Ngày */}
        <select
          className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          disabled={!selectedMovie}
        >
          <option value="">3. Chọn Ngày</option>
          {availableDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>

        {/* Chọn Suất */}
        <select
          className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          disabled={!selectedDate}
        >
          <option value="">4. Chọn Suất</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        {/* Nút Đặt Vé */}
        <button
          className="bg-primary text-white font-bold py-3 rounded-md text-lg w-full transition-all duration-300 hover:bg-primary/60 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleBooking}
          disabled={
            !selectedCinema || !selectedMovie || !selectedDate || !selectedTime
          }
        >
          ĐẶT NGAY
        </button>
      </div>
    </div>
  );
};

export default QuickBooking;
