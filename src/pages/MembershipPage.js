// src/pages/Profile/MembershipPage.jsx
import React from "react";

const MembershipPage = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">ĐĂNG KÝ THÀNH VIÊN</h1>

      <div className="text-sm mb-2 text-right text-red-400">0/10K</div>
      <div className="w-full h-3 bg-gray-600 rounded-full mb-6">
        <div
          className="h-full bg-yellow-400 rounded-full"
          style={{ width: "0%" }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#1f1f3b] p-4 rounded">
          <img src="./images/member1.jpg" alt="CFriend" className="mb-3 w-full rounded" />
          <h2 className="text-lg font-bold text-yellow-400">C'FRIEND</h2>
          <ul className="list-disc pl-5 text-sm mt-2">
            <li>Giảm 10% khi mua bắp nước</li>
            <li>Tặng 1 vé 2D mỗi tuần sinh nhật</li>
            <li>Tích điểm với mỗi 500đ</li>
          </ul>
        </div>

        <div className="bg-[#1f1f3b] p-4 rounded">
          <img src="/images/member2.jpg" alt="CVIP" className="mb-3 w-full rounded" />
          <h2 className="text-lg font-bold text-yellow-400">C'VIP</h2>
          <ul className="list-disc pl-5 text-sm mt-2">
            <li>Giảm 15% khi mua bắp nước</li>
            <li>Nhận quà dịp lễ / sinh nhật</li>
            <li>Ưu đãi sự kiện đặc biệt</li>
          </ul>
        </div>
      </div>

      <button className="bg-gray-200 text-black px-4 py-2 font-semibold rounded mb-6">
        BẠN ĐÃ LÀ THÀNH VIÊN C'FRIEND
      </button>

      <img src="/images/reward.jpg" alt="Mức thưởng" className="rounded w-full md:w-2/6" />
    </div>
  );
};

export default MembershipPage;
