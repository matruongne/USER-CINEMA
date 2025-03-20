import React from "react";
import { Link } from "react-router-dom";

const EventRentalPage = () => {
  const handleContactClick = (subject) => {
    window.location.href = `mailto:Beoruiden1231242125@gmail.com?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div className="bg-[#0C1C36] text-white">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold">THUÊ SỰ KIỆN</h1>
        <p className="text-lg mt-2">
          Lên kế hoạch cho một sự kiện? Chúng tôi có nhiều lựa chọn địa điểm phù hợp.
        </p>
      </div>

      {/* Danh sách sự kiện */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1C2A48] p-6 rounded-lg">
          <img src="/images/event1.jpg" alt="Fanclub" className="w-full rounded-md mb-4" />
          <h2 className="text-2xl font-bold">Fanclub, Cầu hôn, Sinh nhật</h2>
          <p className="mt-2">Cinestar Cinemas kỳ vọng sẽ mang đến không gian thú vị cho sự kiện của bạn.</p>
          <button 
            className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-400 transition"
            onClick={() => handleContactClick("Liên hệ thuê Fanclub, Cầu hôn, Sinh nhật")}
          >
            LIÊN HỆ NGAY
          </button>
        </div>

        <div className="bg-[#1C2A48] p-6 rounded-lg">
          <img src="/images/event2.jpg" alt="Ra mắt chương trình" className="w-full rounded-md mb-4" />
          <h2 className="text-2xl font-bold">Ra mắt Chương trình, MV, Phim</h2>
          <p className="mt-2">Dịch vụ chuyên nghiệp với hệ thống rạp đạt tiêu chuẩn.</p>
          <button 
            className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-400 transition"
            onClick={() => handleContactClick("Liên hệ thuê Ra mắt Chương trình, MV, Phim")}
          >
            LIÊN HỆ NGAY
          </button>
        </div>

        <div className="bg-[#1C2A48] p-6 rounded-lg">
          <img src="/images/event3.jpg" alt="Hội bộ, Film Festival" className="w-full rounded-md mb-4" />
          <h2 className="text-2xl font-bold">Hội bộ, Film Festival</h2>
          <p className="mt-2">Sự kiện đẳng cấp, dành riêng cho doanh nghiệp.</p>
          <button 
            className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-400 transition"
            onClick={() => handleContactClick("Liên hệ thuê Hội bộ, Film Festival")}
          >
            LIÊN HỆ NGAY
          </button>
        </div>
      </div>

      {/* CÁC DỊCH VỤ CHO THUÊ KHÁC */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center">CÁC DỊCH VỤ CHO THUÊ KHÁC</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {[
            { name: "RẠP CHIẾU PHIM", img: "/images/cinema.jpg", link: "/service-detail/cinema" },
            { name: "NHÀ HÁT OPERA", img: "/images/opera.jpg", link: "/service-detail/opera" },
            { name: "KIDZONE", img: "/images/kidzone.jpg", link: "/service-detail/kidzone" },
            { name: "BOWLING", img: "/images/bowling.jpg", link: "/service-detail/bowling" },
            { name: "NHÀ HÀNG", img: "/images/restaurant.jpg", link: "/service-detail/restaurant" },
            { name: "BILLIARDS", img: "/images/billiards.jpg", link: "/service-detail/billiards" },
          ].map((service, index) => (
            <Link to={service.link} key={index} className="bg-[#1C2A48] p-4 rounded-lg text-center hover:scale-105 transition-transform">
              <img src={service.img} alt={service.name} className="w-full rounded-md mb-4" />
              <h3 className="text-xl font-bold">{service.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventRentalPage;
