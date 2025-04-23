import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movieData from "../data/movies";
import cinemas from "../data/cinemas";
import "./food.css";
import { toast } from "react-toastify";
import SeatLayout from "../components/SeatLayout";

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("3-zones");

  const [selectedCinema, setSelectedCinema] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const stickyBarRef = useRef(null);
  const footerRef = useRef(null);

  // Scroll to top khi component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current && stickyBarRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const stickyBar = stickyBarRef.current;

        if (footerRect.top > window.innerHeight) {
          stickyBar.style.position = "fixed";
          stickyBar.style.bottom = "0";
        } else {
          stickyBar.style.position = "absolute";
          stickyBar.style.bottom = `${footerRef.current.offsetHeight}px`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tạo danh sách 4 ngày tới
  const getNextFourDays = () => {
    const days = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  useEffect(() => {
    const movie = movieData.find((m) => m.id.toString() === id);
    setSelectedMovie(movie);
  }, [id]);

  const seatLayout = {
    rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    cols: 12,
    coupleSeats: [
      "I01",
      "I02",
      "I03",
      "I04",
      "I05",
      "I06",
      "I07",
      "I08",
      "I09",
    ],
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

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name
      );

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
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (name) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
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
    if (!selectedDate) return alert("Vui lòng chọn ngày chiếu.");
    if (!selectedCinema) return alert("Vui lòng chọn rạp.");
    if (!selectedTime) return alert("Vui lòng chọn giờ chiếu.");
    if (selectedSeats.length === 0) return alert("Vui lòng chọn ghế.");

    navigate("/checkout", {
      state: {
        cart,
        totalPrice,
        selectedSeats,
        selectedMovie,
        selectedTime,
        selectedDate,
        selectedCinema,
      },
    });
    setCart([]);
  };

  const handleDateSelect = (date) => {
    setIsLoading(true);
    setSelectedDate(date);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleCinemaSelect = (cinema) => {
    setIsLoading(true);
    setSelectedCinema(cinema);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleTimeSelect = (time, cinema) => {
    setIsLoading(true);
    setSelectedTime(time);
    setSelectedCinema(cinema);
    setShowSeatSelection(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="container mx-auto p-6 text-white">
      {selectedMovie && (
        <div className="mb-6 animate-fade-in">
          <div className="flex gap-8">
            <img
              src={selectedMovie.image}
              alt={selectedMovie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{selectedMovie.title}</h1>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <p className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <strong className="text-lg">Thời lượng:</strong>{" "}
                  {selectedMovie.duration}
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <strong className="text-lg">Quốc gia:</strong>{" "}
                  {selectedMovie.country}
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <strong className="text-lg">Khởi chiếu:</strong>{" "}
                  {selectedMovie.releaseDate}
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <strong className="text-lg">Đạo diễn:</strong>{" "}
                  {selectedMovie.director}
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <strong className="text-lg">Diễn viên:</strong>{" "}
                  <span
                    className="whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ maxWidth: "300px" }}
                  >
                    {selectedMovie.actors || "Đang cập nhật"}
                  </span>
                </p>
              </div>
              <p className="text-lg">{selectedMovie.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Chọn ngày chiếu</h2>
        <div className="flex gap-4">
          {getNextFourDays().map((date) => (
            <button
              key={date.toISOString()}
              className={`px-6 py-3 rounded-lg text-lg transition-all duration-300 hover:scale-105 ${
                selectedDate?.toDateString() === date.toDateString()
                  ? "bg-red-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => handleDateSelect(date)}
            >
              {date.toLocaleDateString("vi-VN", {
                weekday: "long",
                day: "numeric",
                month: "numeric",
              })}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Chọn rạp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cinemas.map((cinema) => (
              <div
                key={cinema.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedCinema === cinema.name
                    ? "bg-red-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleCinemaSelect(cinema.name)}
              >
                <h3 className="text-xl font-bold mb-2">{cinema.name}</h3>
                <p className="text-sm mb-2">{cinema.address}</p>
                <div className="flex flex-wrap gap-2">
                  {["10:00", "13:00", "16:00", "19:00", "22:00"].map((time) => (
                    <button
                      key={time}
                      className={`px-3 py-1 rounded transition-all duration-300 hover:scale-105 ${
                        selectedTime === time && selectedCinema === cinema.name
                          ? "bg-white text-red-600"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTimeSelect(time, cinema.name);
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {showSeatSelection && (
        <>
          <div className="mb-4 flex justify-end">
            <select
              value={selectedLayout}
              onChange={(e) => setSelectedLayout(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
            >
              <option value="3-zones">Layout 3 Zones</option>
              <option value="bowshape">Layout Bow Shape</option>
              <option value="trapezoidal">Layout Trapezoidal</option>
            </select>
          </div>

          <SeatLayout
            layoutType={selectedLayout}
            selectedSeats={selectedSeats}
            bookedSeats={seatLayout.booked}
            onSeatClick={handleSeatClick}
          />

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              CHỌN BẮP NƯỚC
            </h2>

            <div className="space-y-8">
              {/* COMBO */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">
                  COMBO 2 NGÂN
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/combo-gau.jpg"
                        alt="Combo gấu"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">COMBO GẤU</h4>
                        <p className="text-sm text-gray-400 mb-2">
                          1 Bắp + 1 Nước 64oz Phiên Bản Gấu + Caramel
                        </p>
                        <p className="text-yellow-400 font-bold">199.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() => decreaseQuantity("COMBO GẤU")}
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find((item) => item.name === "COMBO GẤU")
                              ?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "COMBO GẤU",
                                price: 199000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/combo-co-gau.jpg"
                        alt="Combo có gấu"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          COMBO CÓ GẤU
                        </h4>
                        <p className="text-sm text-gray-400 mb-2">
                          1 Bắp + 2 Nước 64oz Phiên Bản Gấu + Caramel
                        </p>
                        <p className="text-yellow-400 font-bold">259.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() => decreaseQuantity("COMBO CÓ GẤU")}
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find((item) => item.name === "COMBO CÓ GẤU")
                              ?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "COMBO CÓ GẤU",
                                price: 259000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/combo-nha-gau.jpg"
                        alt="Combo nhà gấu"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          COMBO NHÀ GẤU
                        </h4>
                        <p className="text-sm text-gray-400 mb-2">
                          1 Bắp + 3 Nước 64oz Phiên Bản Gấu + Caramel
                        </p>
                        <p className="text-yellow-400 font-bold">319.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() => decreaseQuantity("COMBO NHÀ GẤU")}
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find((item) => item.name === "COMBO NHÀ GẤU")
                              ?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "COMBO NHÀ GẤU",
                                price: 319000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* NƯỚC NGỌT */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">
                  NƯỚC NGỌT
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/sprite.jpg"
                        alt="Sprite"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          SPRITE 390Z
                        </h4>
                        <p className="text-yellow-400 font-bold">37.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() => decreaseQuantity("SPRITE 390Z")}
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find((item) => item.name === "SPRITE 390Z")
                              ?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "SPRITE 390Z",
                                price: 37000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/coke-zero.jpg"
                        alt="Coke Zero"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          COKE ZERO 390Z
                        </h4>
                        <p className="text-yellow-400 font-bold">37.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() => decreaseQuantity("COKE ZERO 390Z")}
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find((item) => item.name === "COKE ZERO 390Z")
                              ?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "COKE ZERO 390Z",
                                price: 37000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/fanta.jpg"
                        alt="Fanta"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          FANTA 390Z
                        </h4>
                        <p className="text-yellow-400 font-bold">37.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() => decreaseQuantity("FANTA 390Z")}
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find((item) => item.name === "FANTA 390Z")
                              ?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "FANTA 390Z",
                                price: 37000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* NƯỚC ĐÓNG CHAI */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">
                  NƯỚC ĐÓNG CHAI
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/teppy.jpg"
                        alt="Teppy"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          NƯỚC CAM TEPPY
                        </h4>
                        <p className="text-yellow-400 font-bold">58.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() => decreaseQuantity("NƯỚC CAM TEPPY")}
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find((item) => item.name === "NƯỚC CAM TEPPY")
                              ?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "NƯỚC CAM TEPPY",
                                price: 58000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/dasani.jpg"
                        alt="Dasani"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          NƯỚC SUỐI DASANI 500ML
                        </h4>
                        <p className="text-yellow-400 font-bold">30.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() =>
                              decreaseQuantity("NƯỚC SUỐI DASANI 500ML")
                            }
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find(
                              (item) => item.name === "NƯỚC SUỐI DASANI 500ML"
                            )?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "NƯỚC SUỐI DASANI 500ML",
                                price: 30000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/nutriboost.jpg"
                        alt="Nutriboost"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          NƯỚC TRÁI CÂY NUTRIBOOST 297ML
                        </h4>
                        <p className="text-yellow-400 font-bold">58.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() =>
                              decreaseQuantity("NƯỚC TRÁI CÂY NUTRIBOOST 297ML")
                            }
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find(
                              (item) =>
                                item.name === "NƯỚC TRÁI CÂY NUTRIBOOST 297ML"
                            )?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "NƯỚC TRÁI CÂY NUTRIBOOST 297ML",
                                price: 58000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SNACKS - KẸO */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">
                  SNACKS - KẸO
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/snack-thai.jpg"
                        alt="Snack Thái"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          SNACK THÁI
                        </h4>
                        <p className="text-yellow-400 font-bold">25.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() => decreaseQuantity("SNACK THÁI")}
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find((item) => item.name === "SNACK THÁI")
                              ?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "SNACK THÁI",
                                price: 25000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/poca-wavy.jpg"
                        alt="Poca Wavy"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          POCA WAVY 54GR
                        </h4>
                        <p className="text-yellow-400 font-bold">35.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() => decreaseQuantity("POCA WAVY 54GR")}
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find((item) => item.name === "POCA WAVY 54GR")
                              ?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "POCA WAVY 54GR",
                                price: 35000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/lays-stax.jpg"
                        alt="Lay's Stax"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          KHOAI TÂY LAY'S STAX 105G
                        </h4>
                        <p className="text-yellow-400 font-bold">45.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() =>
                              decreaseQuantity("KHOAI TÂY LAY'S STAX 105G")
                            }
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find(
                              (item) =>
                                item.name === "KHOAI TÂY LAY'S STAX 105G"
                            )?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "KHOAI TÂY LAY'S STAX 105G",
                                price: 45000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/snack-partyz.jpg"
                        alt="Snack Partyz"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          SNACK PARTYZ 55GR
                        </h4>
                        <p className="text-yellow-400 font-bold">35.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() =>
                              decreaseQuantity("SNACK PARTYZ 55GR")
                            }
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find(
                              (item) => item.name === "SNACK PARTYZ 55GR"
                            )?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "SNACK PARTYZ 55GR",
                                price: 35000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex gap-4">
                      <img
                        src="/images/poca-khoai-tay.jpg"
                        alt="Poca Khoai Tây"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold mb-2 text-white">
                          POCA KHOAI TÂY 54GR
                        </h4>
                        <p className="text-yellow-400 font-bold">35.000 VNĐ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            className="bg-gray-700 px-3 py-1 rounded text-white"
                            onClick={() =>
                              decreaseQuantity("POCA KHOAI TÂY 54GR")
                            }
                          >
                            -
                          </button>
                          <span className="text-white">
                            {cart.find(
                              (item) => item.name === "POCA KHOAI TÂY 54GR"
                            )?.quantity || 0}
                          </span>
                          <button
                            className="bg-red-600 px-3 py-1 rounded text-white"
                            onClick={() =>
                              handleAddToCart({
                                name: "POCA KHOAI TÂY 54GR",
                                price: 35000,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={stickyBarRef}
            className="sticky-bar bg-gradient-to-t from-[#1a1f37] to-transparent pt-8"
          >
            <div className="container mx-auto px-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-gray-400">
                    <p>Rạp: {selectedCinema}</p>
                    <p>
                      Suất: {selectedTime} |{" "}
                      {selectedDate?.toLocaleDateString("vi-VN")}
                    </p>
                    <p>Ghế: {selectedSeats.join(", ")}</p>
                    {cart.length > 0 && (
                      <p>
                        Combo:{" "}
                        {cart
                          .map((item) => `${item.name} x${item.quantity}`)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-gray-400 text-sm">Thời gian giữ vé</p>
                      <p className="text-yellow-400 text-xl font-bold">05:00</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Tổng tiền</p>
                      <p className="text-yellow-400 text-xl font-bold">
                        {totalPrice.toLocaleString()} VNĐ
                      </p>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="bg-yellow-500 px-8 py-3 rounded-lg text-lg font-bold text-gray-900 hover:bg-yellow-600 transition"
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>

                {showDetails && (
                  <div className="mt-4 pt-4 border-t border-gray-700 animate-fade-in">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                          {selectedMovie?.title}
                        </h2>
                        <p className="text-gray-400 mb-2">
                          {selectedMovie?.description}
                        </p>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <p className="text-gray-400">
                            Tiền vé:{" "}
                            <span className="text-white">
                              {seatTotal.toLocaleString()} VNĐ
                            </span>
                          </p>
                          {cart.length > 0 && (
                            <>
                              <p className="text-gray-400">khác :</p>
                              <div className="pl-4">
                                {cart.map((item) => (
                                  <p key={item.name} className="text-white">
                                    {item.name} x{item.quantity} -{" "}
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString()}{" "}
                                    VNĐ
                                  </p>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className="flex items-center justify-center mt-2 cursor-pointer"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <span className="text-blue-400 underline text-sm">
                    {showDetails ? "Ẩn chi tiết" : "Xem chi tiết"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-blue-400 transform transition-transform ml-1 ${
                      showDetails ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div ref={footerRef} className="mt-32">
            {/* Your footer content */}
          </div>

          <style jsx>{`
            .sticky-bar {
              position: fixed;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 50;
            }
          `}</style>
        </>
      )}
    </div>
  );
};

export default BookingDetail;
