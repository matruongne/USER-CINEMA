import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movies from "../data/movies";
import "../styles/seats.css"; // Import CSS cho ghế ngồi

const TICKET_PRICES = {
  normal: 50000,
  vip: 80000,
  couple: 120000,
};

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketType, setTicketType] = useState("normal");
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
        navigate("/");
      }, 3000);
    }, 2000);
  };

  const totalPrice = selectedSeats.length * TICKET_PRICES[ticketType];

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Đặt vé: {movie.title}</h1>

      {/* Hiển thị thông báo đặt vé thành công */}
      {isBookingSuccess && (
        <div className="bg-green-500 text-white text-center p-4 rounded-md">
          ✅ Đặt vé thành công! Bạn sẽ được chuyển về trang chủ sau 3 giây...
        </div>
      )}

      {/* Chọn loại vé */}
      <div className="mb-4">
        <label className="mr-2">Loại vé:</label>
        <select
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
          className="p-2 border rounded text-black"
        >
          <option value="normal">Vé Thường - 50.000đ</option>
          <option value="vip">Vé VIP - 80.000đ</option>
          <option value="couple">Vé Đôi - 120.000đ</option>
        </select>
      </div>

      {/* Ghế ngồi */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array.from({ length: 20 }, (_, index) => {
          const seatNumber = index + 1;
          return (
            <button
              key={seatNumber}
              className={`seat ${
                selectedSeats.includes(seatNumber) ? "selected" : "available"
              }`}
              onClick={() => handleSeatSelection(seatNumber)}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>

      {/* Tổng tiền */}
      <div className="text-lg font-bold mb-4">
        Tổng tiền:{" "}
        <span className="text-yellow-400">{totalPrice.toLocaleString()}đ</span>
      </div>

      {/* Nút đặt vé */}
      <button
        onClick={handleBooking}
        className={`bg-red-600 px-4 py-2 rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Xác nhận đặt vé"}
      </button>
    </div>
  );
};

export default Booking;
