import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-bgColor text-white min-h-screen">
      {/* Banner */}
      <div className="relative">
        <img
          src="/images/about-banner.jpg"
          alt="Giới thiệu rạp chiếu phim"
          className="w-full h-[400px] object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-5xl font-bold">VỀ CHÚNG TÔI</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl text-center">
            Hệ thống rạp chiếu phim hiện đại, mang đến trải nghiệm điện ảnh đỉnh
            cao với không gian sang trọng và dịch vụ tận tâm.
          </p>
        </div>
      </div>

      {/* Nội dung giới thiệu */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-yellow-400">
              HỆ THỐNG RẠP CHIẾU HIỆN ĐẠI
            </h2>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              Chúng tôi tự hào mang đến hệ thống rạp chiếu phim hiện đại với
              tiêu chuẩn quốc tế, đảm bảo hình ảnh sắc nét và âm thanh sống
              động.
            </p>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              Với không gian rộng rãi, thoải mái, cùng với dịch vụ chuyên
              nghiệp, chúng tôi cam kết mang lại trải nghiệm điện ảnh tuyệt vời
              nhất cho mọi khách hàng.
            </p>
          </div>
          <img
            src="/images/cinema-hall.jpg"
            alt="Rạp chiếu phim"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Các dịch vụ nổi bật */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-yellow-400">
            DỊCH VỤ CỦA CHÚNG TÔI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {[
              { name: "Phòng chiếu VIP", img: "/images/vip-room1.jpg" },
              { name: "Ẩm thực đa dạng", img: "/images/food.jpg" },
              { name: "Không gian trẻ em", img: "/images/kidzone.jpg" },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-[#1C2A48] p-4 rounded-lg text-center hover:scale-105 transition-transform"
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full rounded-md mb-4"
                />
                <h3 className="text-xl font-bold">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cam kết chất lượng */}
      <div className="bg-[#1C2A48] py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-yellow-400">
            CAM KẾT CỦA CHÚNG TÔI
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Chúng tôi luôn đặt chất lượng dịch vụ và trải nghiệm khách hàng lên
            hàng đầu, mang đến những khoảnh khắc điện ảnh đáng nhớ nhất.
          </p>
          <Link
            to="/event-rental"
            className="mt-6 inline-block bg-yellow-500 px-6 py-3 rounded text-black font-bold hover:bg-yellow-400 transition"
          >
            KHÁM PHÁ DỊCH VỤ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
