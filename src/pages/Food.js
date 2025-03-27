import React, { useState } from "react";
import foodData from "../data/foodData";
import cinemas from "../data/cinemas";
import "./food.css";
import { useNavigate } from "react-router-dom";

const Food = () => {
  const [selectedCinema, setSelectedCinema] = useState(""); // Rạp được chọn
  const [selectedCategory, setSelectedCategory] = useState("Tất cả"); // Danh mục
  const [cart, setCart] = useState([]); // Giỏ hàng
  const navigate = useNavigate();

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
            <div key={item.id} className="food-item bg-gray-800 p-4 rounded-lg">
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
          ))
        ) : (
          <p className="text-center col-span-full">
            Không có sản phẩm phù hợp.
          </p>
        )}
      </div>

      {/* Hiển thị giỏ hàng */}
      {cart.length > 0 && (
        <div className="mt-10 p-6 bg-gray-900 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Giỏ Hàng</h2>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-700 py-2"
            >
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-yellow-400">
                  {item.price.toLocaleString()} VNĐ x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-700 px-2 py-1 rounded"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-700 px-2 py-1 rounded"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-lg font-bold text-yellow-400">
            Tổng: {totalPrice.toLocaleString()} VNĐ
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
        Thanh Toán
      </button>
        </div>
      )}
    </div>
  );
};

export default Food;
