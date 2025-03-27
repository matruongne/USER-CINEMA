import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice, paymentMethod } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-3/5 text-center">
        <h1 className="text-3xl font-bold text-green-400 mb-4">✅ Thanh Toán Thành Công!</h1>
        <p className="text-lg">Cảm ơn bạn đã đặt hàng. Dưới đây là chi tiết đơn hàng:</p>

        <div className="mt-4 text-left">
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

        <h2 className="text-xl font-semibold mt-4">Tổng tiền: {totalPrice.toLocaleString()} VNĐ</h2>
        <h3 className="text-lg font-semibold mt-2">Phương thức thanh toán: {paymentMethod}</h3>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-all"
        >
          Trở về Trang Chủ
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
