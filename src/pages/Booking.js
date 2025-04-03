import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movies from "../data/movies";
import "../styles/seats.css";

const TICKET_PRICES = {
  normal: 50000,
  vip: 80000,
  couple: 120000,
};

const POPCORN_PRICES = {
  small: 30000,
  medium: 50000,
  large: 70000,
};

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => String(m.id) === String(id));

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketType, setTicketType] = useState("normal");
  const [popcornSize, setPopcornSize] = useState("none");
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!movie) {
    return <div className="text-center text-red-500">Phim không tồn tại</div>;
  }

  const handleSeatSelection = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsBookingSuccess(true);
      setTimeout(() => {
        navigate("/"); // Redirect to the homepage after booking success
      }, 3000);
    }, 2000);
  };

  const totalPrice =
    selectedSeats.length * TICKET_PRICES[ticketType] +
    (popcornSize !== "none" ? POPCORN_PRICES[popcornSize] : 0);

  return (
    <div className="container mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">
        Đặt vé - {movie.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Movie Information */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-96 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <p className="text-gray-400">
            {movie.genre} • {movie.duration} phút
          </p>
          <p>
            <strong>Đạo diễn:</strong> {movie.director}
          </p>
          <p>
            <strong>Diễn viên:</strong> {movie.cast.join(", ")}
          </p>
          <p>
            <strong>Quốc gia:</strong> {movie.country}
          </p>
          <p>
            <strong>Khởi chiếu:</strong> {movie.releaseDate}
          </p>
          <p className="mt-2">{movie.description}</p>
          <a
            href={movie.trailer}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-blue-400 hover:underline"
          >
            🎬 Xem trailer
          </a>
        </div>

        {/* Seat Selection */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Chọn ghế ngồi</h2>

          {/* Ticket Type Selection */}
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-md mb-4"
          >
            <option value="normal">Thường - 50,000đ</option>
            <option value="vip">VIP - 80,000đ</option>
            <option value="couple">Couple - 120,000đ</option>
          </select>

          <div className="screen bg-gray-500 w-full h-10 mb-4 text-center text-black font-bold rounded-md flex items-center justify-center">
            📽️ Màn Hình
          </div>

          {/* Seat Map */}
          <div className="seat-map grid gap-2">
            {"ABCDEFGH".split("").map((row) => (
              <div key={row} className="seat-row flex justify-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                  const seat = `${row}${num}`;
                  return (
                    <button
                      key={seat}
                      className={`seat-icon ${
                        selectedSeats.includes(seat) ? "selected" : "available"
                      }`}
                      onClick={() => handleSeatSelection(seat)}
                    >
                      <img
                        src={`/icons/${
                          selectedSeats.includes(seat)
                            ? "seat-selected"
                            : "seat-available"
                        }.png`}
                        alt={seat}
                        className="w-8 h-8"
                      />
                      <span className="text-sm">{seat}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Popcorn and Drink Selection */}
          <h2 className="text-xl font-semibold mt-4">Chọn bắp nước</h2>
          <select
            value={popcornSize}
            onChange={(e) => setPopcornSize(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-md mb-4"
          >
            <option value="none">Không chọn</option>
            <option value="small">Nhỏ - 30,000đ</option>
            <option value="medium">Vừa - 50,000đ</option>
            <option value="large">Lớn - 70,000đ</option>
          </select>

         {/* Total Price */}
<div className="text-lg font-bold mt-4">
  <h3 className="text-xl">Tổng tiền:</h3>
  <div className="text-yellow-400">
    {selectedSeats.length > 0 && (
      <div>
        <strong>Ghế đã chọn:</strong> {selectedSeats.join(", ")} -{" "}
        {selectedSeats.length * TICKET_PRICES[ticketType].toLocaleString()}.000 đ
      </div>
    )}
    {popcornSize !== "none" && (
      <div>
        <strong>Bắp:</strong> {popcornSize} - {POPCORN_PRICES[popcornSize].toLocaleString()}đ
      </div>
    )}
  
    <div className="mt-2">
      <strong>Tổng cộng:</strong>{" "}
      <span className="text-yellow-400">
        {totalPrice.toLocaleString()}đ
      </span>
    </div>
  </div>
</div>

          {/* Booking Button */}
          <button
            onClick={handleBooking}
            className={`bg-red-600 px-4 py-2 rounded-md w-full mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận đặt vé"}
          </button>

          {/* Booking Success Message */}
          {isBookingSuccess && (
            <div className="bg-green-500 text-white text-center p-4 rounded-md mt-4">
              ✅ Đặt vé thành công! Bạn sẽ được chuyển về trang chủ sau 3
              giây...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
