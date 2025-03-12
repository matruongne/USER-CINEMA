import React, { useState  } from "react";

const QuickBooking = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#F2F3F5] py-6 px-4 rounded-lg shadow-lg flex flex-col items-center max-w-[1200px] w-full">
        <h2 className="text-3xl font-bold text-black mb-4">ĐẶT VÉ NHANH</h2>

        <div className="w-full flex flex-wrap justify-center gap-4 md:gap-6">
          <select className="p-3 w-56 md:w-60 rounded-lg border border-gray-300 bg-white text-black font-medium">
            <option value="">1. Chọn Rạp</option>
          </select>

          <select className="p-3 w-56 md:w-60 rounded-lg border border-gray-300 bg-white text-black font-medium">
            <option value="">2. Chọn Phim</option>
          </select>

          <select className="p-3 w-56 md:w-60 rounded-lg border border-gray-300 bg-white text-black font-medium">
            <option value="">3. Chọn Ngày</option>
          </select>

          <select className="p-3 w-56 md:w-60 rounded-lg border border-gray-300 bg-white text-black font-medium">
            <option value="">4. Chọn Suất</option>
          </select>
        </div>

        <button className="mt-6 px-6 py-3 bg-[#6B21A8] text-white text-lg font-bold rounded-lg hover:bg-[#581C87] transition">
          ĐẶT NGAY
        </button>
      </div>
    </div>
  );
};

export default QuickBooking;
