import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import cinemas from "../../data/cinemas";
import movies from "../../data/movies";
import {
  MapPin,
  Phone,
  Clock,
  Car,
  Star,
  Info,
  Map,
  Bus,
  Train,
  Coffee,
  Camera,
  Music,
  Gift,
} from "lucide-react";

const CinemaDetail = () => {
  const { slug } = useParams();
  const cinema = cinemas.find((c) => c.slug === slug);
  const [selectedDate, setSelectedDate] = useState("14/03/2025");
  const [activeTab, setActiveTab] = useState("info");

  // Lấy danh sách ngày chiếu
  const dates = [
    "14/03/2025",
    "15/03/2025",
    "16/03/2025",
    "17/03/2025",
    "18/03/2025",
  ];

  if (!cinema) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Không tìm thấy rạp chiếu phim
          </h2>
          <p className="text-gray-400 mb-6">
            Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang chủ
          </p>
          <Link
            to="/"
            className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Thông tin rạp */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={cinema.image}
              alt={cinema.name}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-4 text-white">
              {cinema.name}
            </h1>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="text-yellow-400 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400">
                    Địa chỉ
                  </h2>
                  <p className="text-gray-300">{cinema.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="text-yellow-400 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400">
                    Điện thoại
                  </h2>
                  <p className="text-gray-300">{cinema.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="text-yellow-400 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400">
                    Giờ mở cửa
                  </h2>
                  <p className="text-gray-300">{cinema.openingHours}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Car className="text-yellow-400 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-yellow-400">
                    Bãi đỗ xe
                  </h2>
                  <p className="text-gray-300">{cinema.parking}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tiện ích */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-white">Tiện ích</h2>
          <div className="flex flex-wrap gap-2">
            {cinema.facilities.map((facility, index) => (
              <span
                key={index}
                className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>

        {/* Mô tả */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-white">Giới thiệu</h2>
          <p className="text-gray-300">{cinema.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex border-b border-gray-700">
          <button
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "info"
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("info")}
          >
            <Info className="inline-block mr-2" size={18} />
            Thông tin
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "movies"
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("movies")}
          >
            <Camera className="inline-block mr-2" size={18} />
            Phim đang chiếu
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === "promotions"
                ? "border-b-2 border-yellow-400 text-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("promotions")}
          >
            <Gift className="inline-block mr-2" size={18} />
            Khuyến mãi
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "info" && (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          {/* Đặc điểm nổi bật */}
          {cinema.specialFeatures && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-white">
                Đặc điểm nổi bật
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cinema.specialFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Star className="text-yellow-400 mt-1" size={18} />
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Địa điểm gần đó */}
          {cinema.nearbyAttractions && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-white">
                Địa điểm gần đó
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cinema.nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Map className="text-yellow-400 mt-1" size={18} />
                    <p className="text-gray-300">{attraction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phương tiện di chuyển */}
          {cinema.transportation && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-white">
                Phương tiện di chuyển
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cinema.transportation.map((transport, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Bus className="text-yellow-400 mt-1" size={18} />
                    <p className="text-gray-300">{transport}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "movies" && (
        <div>
          {/* Chọn ngày */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-white">Chọn ngày</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {dates.map((date) => (
                <button
                  key={date}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedDate === date
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Danh sách phim */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-white">
              Lịch chiếu phim
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg flex hover:shadow-xl transition-shadow"
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-32 h-48 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {movie.description}
                    </p>

                    {/* Hiển thị suất chiếu theo ngày đã chọn */}
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {movie.showtimes[selectedDate]?.length > 0 ? (
                        movie.showtimes[selectedDate].map((time, index) => (
                          <Link
                            key={index}
                            to={`/booking/${movie.id}?cinema=${cinema.slug}&date=${selectedDate}&time=${time}`}
                            className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded-md hover:bg-yellow-500 transition"
                          >
                            {time}
                          </Link>
                        ))
                      ) : (
                        <p className="text-red-500">Không có suất chiếu</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "promotions" && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">Khuyến mãi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/promotion1.jpg"
                alt="Khuyến mãi 1"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-white">
                Ưu đãi thẻ thành viên
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Giảm 20% cho thành viên mới
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/promotion2.jpg"
                alt="Khuyến mãi 2"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-white">Combo bắp nước</h3>
              <p className="text-gray-400 text-sm mt-1">
                Mua 1 tặng 1 cho combo bắp nước
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/promotion3.jpg"
                alt="Khuyến mãi 3"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-white">Ngày vàng</h3>
              <p className="text-gray-400 text-sm mt-1">
                Giảm 30% cho tất cả vé vào thứ 3
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinemaDetail;
