import React, { useState, useRef, useEffect } from "react";
import foodData from "../data/foodData";
import cinemas from "../data/cinemas";
import "./food.css";
import { useNavigate } from "react-router-dom";

const Food = () => {
  const [selectedCinema, setSelectedCinema] = useState(""); // Rạp được chọn
  const [selectedCategory, setSelectedCategory] = useState("Tất cả"); // Danh mục
  const [cart, setCart] = useState([]); // Giỏ hàng
  const [showDetails, setShowDetails] = useState(false); // Hiển thị chi tiết
  const navigate = useNavigate();
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

  // Lọc sản phẩm theo rạp đã chọn
  const filteredFoods = foodData.filter(
    (item) => selectedCinema === "" || item.cinemas.includes(selectedCinema)
  );

  // Lọc theo danh mục sản phẩm
  const displayedFoods =
    selectedCategory === "Tất cả"
      ? filteredFoods
      : filteredFoods.filter((item) => item.category === selectedCategory);

  // Thêm vào giỏ hàng
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
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

    // Thêm hiệu ứng nhảy ra
    // const productElement = document.getElementById(`food-${item.id}`);
    // if (productElement) {
    //   productElement.classList.add("added-to-cart");
    //   setTimeout(() => productElement.classList.remove("added-to-cart"), 300);
    // }
  };

  // Giảm số lượng hoặc xóa khỏi giỏ hàng nếu số lượng = 0
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Tính tổng tiền
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Xóa giỏ hàng sau khi thanh toán
  const handleCheckout = () => {
    navigate("/checkout", { state: { cart, totalPrice } });
    setCart([]);
  };

  return (
    <div className="container mx-auto p-6 text-white">
      {/* Chọn rạp */}
      <h1 className="text-3xl font-bold text-center mb-6">Chọn Rạp</h1>
      <div className="flex justify-center mb-6">
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
      </div>

      {/* Bộ lọc danh mục */}
      <div className="flex justify-center gap-4 mb-6">
        {["Tất cả", "Combo", "Bắp Rang", "Nước Ngọt", "Nước Ép", "Snack"].map(
          (category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category ? "bg-red-600" : "bg-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Hiển thị sản phẩm */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedFoods.length > 0 ? (
          displayedFoods.map((item) => (
            <div
              key={item.id}
              className="food-item bg-gray-800 p-4 rounded-lg flex flex-col h-full"
            >
              <div className="flex-grow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-sm text-gray-400">{item.description}</p>
                <div className="mt-auto">
                  <p className="text-primary font-bold text-lg">
                    {item.price.toLocaleString()} VNĐ
                  </p>
                </div>
              </div>
              <button
                className="mt-3 bg-primary text-white font-bold px-4 py-2 rounded-lg w-full transition-all duration-300 hover:bg-primary/60"
                onClick={() => addToCart(item)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">
            Không có sản phẩm phù hợp.
          </p>
        )}
      </div>

      {/* Hiển thị giỏ hàng */}
      {cart.length > 0 && (
        <div
          ref={stickyBarRef}
          className="sticky-bar bg-gradient-to-t from-[#1a1f37] to-transparent pt-8"
        >
          <div className="container mx-auto px-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm text-gray-400">
                  <p>Rạp: {selectedCinema}</p>
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
                    <p className="text-gray-400 text-sm">Tổng tiền</p>
                    <p className="text-yellow-400 text-xl font-bold">
                      {cart
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toLocaleString()}{" "}
                      VNĐ
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
                        Chi tiết đơn hàng
                      </h2>
                    </div>
                    <div>
                      <div className="space-y-2">
                        {cart.map((item) => (
                          <p key={item.id} className="text-white">
                            {item.name} x{item.quantity} -{" "}
                            {(item.price * item.quantity).toLocaleString()} VNĐ
                          </p>
                        ))}
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
      )}

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
    </div>
  );
};

export default Food;
