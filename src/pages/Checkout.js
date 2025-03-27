import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    // Giả lập xử lý thanh toán
    setTimeout(() => {
      navigate("/checkout-success", {
        state: { cart, totalPrice, paymentMethod },
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">🛒 Thanh Toán</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-3/5">
        <h2 className="text-2xl font-semibold mb-4">Chi Tiết Đơn Hàng</h2>

        {cart.length === 0 ? (
          <p className="text-gray-400">Giỏ hàng trống</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center mb-4 border-b border-gray-700 pb-2">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-400">Số lượng: {item.quantity}</p>
                  <p className="text-yellow-400 font-semibold">{item.price.toLocaleString()} VNĐ</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-xl font-semibold mt-4">Tổng tiền: {totalPrice.toLocaleString()} VNĐ</h2>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Chọn phương thức thanh toán:</h3>
          <div className="flex flex-col space-y-2">
            {["Visa/Mastercard", "Momo", "VNPay", "COD"].map((method) => (
              <label key={method} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  onChange={() => setPaymentMethod(method)}
                  className="form-radio text-blue-500"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded-lg w-full transition-all"
        >
          Xác Nhận Thanh Toán
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg w-full transition-all"
        >
          Trở về Trang Chủ
        </button>
      </div>
    </div>
  );
};

export default Checkout;
