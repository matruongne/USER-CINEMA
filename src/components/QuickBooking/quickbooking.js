import React from "react";

const QuickBooking = () => {
  return (
    <div className="bg-[#0C1C36] py-4 px-6 rounded-lg w-[90%] mx-auto mt-6 shadow-md">
      <h2 className="text-white text-2xl font-bold mb-4">ĐẶT VÉ NHANH</h2>
      <div className="grid grid-cols-5 gap-2 items-center">
        <button className="bg-transparent border-2 border-[#6A1B9A] text-[#6A1B9A] font-semibold py-3 rounded-md text-lg w-full transition-all duration-300 hover:bg-[#6A1B9A] hover:text-white">
          1. Chọn Rạp
        </button>
        <button className="bg-transparent border-2 border-[#6A1B9A] text-[#6A1B9A] font-semibold py-3 rounded-md text-lg w-full transition-all duration-300 hover:bg-[#6A1B9A] hover:text-white">
          2. Chọn Phim
        </button>
        <button className="bg-transparent border-2 border-[#6A1B9A] text-[#6A1B9A] font-semibold py-3 rounded-md text-lg w-full transition-all duration-300 hover:bg-[#6A1B9A] hover:text-white">
          3. Chọn Ngày
        </button>
        <button className="bg-transparent border-2 border-[#6A1B9A] text-[#6A1B9A] font-semibold py-3 rounded-md text-lg w-full transition-all duration-300 hover:bg-[#6A1B9A] hover:text-white">
          4. Chọn Suất
        </button>
        <button className="bg-[#6A1B9A] text-white font-bold py-3 rounded-md text-lg w-full transition-all duration-300 hover:bg-[#9C27B0]">
          ĐẶT NGAY
        </button>
      </div>
    </div>
  );
};

export default QuickBooking;
