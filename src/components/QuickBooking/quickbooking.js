import React, { useState, useEffect } from "react";
import movies from "../../data/movies";

const QuickBooking = () => {
  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]);
  const [dates, setDates] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Giả lập API lấy dữ liệu rạp
  useEffect(() => {
    const fetchCinemas = async () => {
      // Thay thế bằng API thực tế nếu có
      const data = [
        "Cinestar Quốc Thanh (TP.HCM)",
        "Cinestar Hai Bà Trưng (TP.HCM)",
        "Cinestar Sinh Viên (Bình Dương)",
        "Cinestar Mỹ Tho (Tiền Giang)",
      ];
      setCinemas(data);
    };
    fetchCinemas();
  }, []);

  // Lấy phim theo rạp đã chọn
  useEffect(() => {
    if (!selectedCinema) return;
    const fetchMovies = async () => {
      // Giả lập API lấy phim của rạp
      const data = [
        { id: 1, title: "Avengers: Endgame" },
        { id: 2, title: "John Wick 4" },
      ];
      setMovies(data);
    };
    fetchMovies();
  }, [selectedCinema]);

  // Lấy lịch chiếu theo phim đã chọn
  useEffect(() => {
    if (!selectedMovie) return;
    const fetchDates = async () => {
      // Giả lập danh sách ngày chiếu
      const data = ["01/04/2025", "02/04/2025", "03/04/2025"];
      setDates(data);
    };
    fetchDates();
  }, [selectedMovie]);

  // Lấy suất chiếu theo ngày đã chọn
  useEffect(() => {
    if (!selectedDate) return;
    const fetchSchedules = async () => {
      // Giả lập danh sách suất chiếu
      const data = ["10:00", "14:00", "18:00", "20:30"];
      setSchedules(data);
    };
    fetchSchedules();
  }, [selectedDate]);

  const handleBooking = () => {
    if (!selectedCinema || !selectedMovie || !selectedDate || !selectedTime) {
      alert("Vui lòng chọn đầy đủ thông tin trước khi đặt vé!");
      return;
    }
    alert(
      `Bạn đã đặt vé tại ${selectedCinema} vào ${selectedDate} - ${selectedTime}`
    );
  };

  return (
    <div className="bg-[#0C1C36] py-4 px-6 rounded-lg w-[90%] mx-auto mt-6 shadow-md">
      <h2 className="text-white text-2xl font-bold mb-4">ĐẶT VÉ NHANH</h2>
      <div className="grid grid-cols-5 gap-2 items-center">
        {/* Chọn Rạp */}
        <select
          className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
          onChange={(e) => setSelectedCinema(e.target.value)}
        >
          <option value="">1. Chọn Rạp</option>
          {cinemas.map((cinema, index) => (
            <option key={index} value={cinema} className="text-black">
              {cinema}
            </option>
          ))}
        </select>

        {/* Chọn Phim */}
        <select
          className="p-3 rounded-md text-lg border-2 border-[#6A1B9A]  bg-white text-black"
          onChange={(e) => setSelectedMovie(e.target.value)}
          disabled={!selectedCinema}
        >
          <option value="">2. Chọn Phim</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.title} className="text-black">
              {movie.title}
            </option>
          ))}
        </select>

        {/* Chọn Ngày */}
        <select
          className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
          onChange={(e) => setSelectedDate(e.target.value)}
          disabled={!selectedMovie}
        >
          <option value="">3. Chọn Ngày</option>
          {dates.map((date, index) => (
            <option key={index} value={date} className="text-black">
              {date}
            </option>
          ))}
        </select>

        {/* Chọn Suất */}
        <select
          className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
          onChange={(e) => setSelectedTime(e.target.value)}
          disabled={!selectedDate}
        >
          <option value="" className="text-gray-700">
            4. Chọn Suất
          </option>
          {schedules.map((time, index) => (
            <option key={index} value={time} className="text-black">
              {time}
            </option>
          ))}
        </select>

        {/* Nút Đặt Vé */}
        <button
          className="bg-[#6A1B9A] text-white font-bold py-3 rounded-md text-lg w-full transition-all duration-300 hover:bg-[#9C27B0]"
          onClick={handleBooking}
        >
          ĐẶT NGAY
        </button>
      </div>
    </div>
  );
};

export default QuickBooking;
