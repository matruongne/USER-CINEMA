import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import foodData from "../data/foodData";
import cinemas from "../data/cinemas";
import movieData from "../data/movies";
import "./food.css";
import { toast } from "react-toastify";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [cart, setCart] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const movie = movieData.find((m) => m.id.toString() === id);
    setSelectedMovie(movie);
  }, [id]);

  const seatLayout = {
    rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "M", "N"],
    cols: 12,
    coupleSeats: ["M01", "M02", "M03", "M04", "N01", "N02", "N03", "N04"],
    booked: ["H09"],
  };

  const handleSeatClick = (seat) => {
    if (seatLayout.booked.includes(seat)) return;
    if (seatLayout.coupleSeats.includes(seat)) {
      const seatIndex = parseInt(seat.slice(1));
      const row = seat[0];
      const pair = seatIndex % 2 === 0 ? seatIndex - 1 : seatIndex + 1;
      const pairSeat = `${row}${pair.toString().padStart(2, "0")}`;
      if (selectedSeats.includes(seat) && selectedSeats.includes(pairSeat)) {
        setSelectedSeats((prev) =>
          prev.filter((s) => s !== seat && s !== pairSeat)
        );
      } else {
        setSelectedSeats((prev) => [...prev, seat, pairSeat]);
      }
      return;
    }
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const filteredFoods = foodData.filter(
    (item) => selectedCinema === "" || item.cinemas.includes(selectedCinema)
  );

  const displayedFoods =
    selectedCategory === "Tất cả"
      ? filteredFoods
      : filteredFoods.filter((item) => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      toast(`Đã thêm ${item.name} vào giỏ hàng`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const seatPrice = 75000;
  const seatTotal = selectedSeats.length * seatPrice;
  const foodTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalPrice = seatTotal + foodTotal;

  const handleCheckout = () => {
    if (!selectedMovie) return alert("Vui lòng chọn phim.");
    if (!selectedTime) return alert("Vui lòng chọn giờ chiếu.");
    if (selectedSeats.length === 0) return alert("Vui lòng chọn ghế.");

    navigate("/checkout", {
      state: {
        cart,
        totalPrice,
        selectedSeats,
        selectedMovie,
        selectedTime,
      },
    });
    setCart([]);
  };

  return (
    <div className="container mx-auto p-6 text-white">
      {selectedMovie && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{selectedMovie.title}</h1>
          <div className="flex gap-6">
            <img
              src={selectedMovie.poster}
              alt={selectedMovie.title}
              className="w-48 rounded"
            />
            <div>
              <p>
                <strong>Thời lượng:</strong> {selectedMovie.duration}
              </p>
              <p>
                <strong>Quốc gia:</strong> {selectedMovie.country}
              </p>
              <p>
                <strong>Khởi chiếu:</strong> {selectedMovie.releaseDate}
              </p>
              <p>
                <strong>Đạo diễn:</strong> {selectedMovie.director}
              </p>
              <p>
                <strong>Diễn viên:</strong> {selectedMovie.cast.join(", ")}
              </p>
              <p className="mt-2">{selectedMovie.description}</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-2">Chọn giờ chiếu</h2>
      <div className="flex gap-4 mb-6">
        {["10:00", "14:00", "18:00", "21:00"].map((time) => (
          <button
            key={time}
            className={`px-4 py-2 rounded-lg ${
              selectedTime === time ? "bg-red-600" : "bg-gray-700"
            }`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>

      {selectedTime && (
        <>
          <h2 className="text-xl font-bold mb-2">Chọn ghế</h2>
          <div className="grid gap-2 mb-6">
            {seatLayout.rows.map((row) => (
              <div key={row} className="flex gap-2">
                {Array.from({ length: seatLayout.cols }, (_, i) => {
                  const seat = `${row}${(i + 1).toString().padStart(2, "0")}`;
                  const isCouple = seatLayout.coupleSeats.includes(seat);
                  const isBooked = seatLayout.booked.includes(seat);
                  const isSelected = selectedSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      disabled={isBooked}
                      onClick={() => handleSeatClick(seat)}
                      className={`w-8 h-8 text-sm rounded ${
                        isBooked
                          ? "bg-gray-600"
                          : isSelected
                          ? "bg-green-500"
                          : isCouple
                          ? "bg-pink-400"
                          : "bg-gray-300"
                      }`}
                    >
                      {seat.slice(1)}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-2">Chọn đồ ăn</h2>
          {/* <div className="flex justify-center mb-4">
            <select
              value={selectedCinema}
              onChange={(e) => setSelectedCinema(e.target.value)}
              className="p-2 text-black rounded-lg"
            >
              <option value="">-- Chọn Rạp --</option>
              {cinemas.map((cinema) => (
                <option key={cinema.id} value={cinema.name}>
                  {cinema.name}
                </option>
              ))}
            </select>
          </div> */}

          <div className="flex justify-center gap-4 mb-6">
            {[
              "Tất cả",
              "Combo",
              "Bắp Rang",
              "Nước Ngọt",
              "Nước Ép",
              "Snack",
            ].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category ? "bg-red-600" : "bg-gray-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedFoods.map((item) => (
              <div key={item.id} className="bg-gray-800 p-4 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-sm">{item.description}</p>
                <p className="text-yellow-400 font-bold mt-2">
                  {item.price.toLocaleString()} VNĐ
                </p>
                <button
                  className="mt-3 bg-red-600 px-4 py-2 rounded-lg w-full hover:bg-red-700 transition"
                  onClick={() => addToCart(item)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-gray-700 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Tóm tắt đặt vé</h2>

            {cart.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Giỏ đồ ăn:</h3>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex bg-purple-400 p-4 rounded-md justify-between items-center mb-2"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-yellow-500 px-4 py-2 rounded"
                      >
                        -
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 px-4 py-2 rounded"
                      >
                        x
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p>
              <strong>Phim:</strong> {selectedMovie.title}
            </p>
            <p>
              <strong>Giờ chiếu:</strong> {selectedTime}
            </p>
            <p>
              <strong>Ghế đã chọn:</strong> {selectedSeats.join(", ")}
            </p>
            <p>
              <strong>Tiền vé:</strong> {seatTotal.toLocaleString()} VNĐ
            </p>
            <p>
              <strong>Tiền đồ ăn:</strong> {foodTotal.toLocaleString()} VNĐ
            </p>
            <p className="text-yellow-400 text-xl mt-2">
              Tổng: {totalPrice.toLocaleString()} VNĐ
            </p>
            <button
              className="mt-4 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              onClick={handleCheckout}
            >
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Booking;
