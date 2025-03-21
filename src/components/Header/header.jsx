import React, { useState } from "react";
import { Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const cinemas = [
  "Cinestar Quốc Thanh (TP.HCM)",
  "Cinestar Hai Bà Trưng (TP.HCM)",
  "Cinestar Huế (TP. Huế)",
  "Cinestar Đà Lạt (TP. Đà Lạt)",
  "Cinestar Mỹ Tho (Tiền Giang)",
  "Cinestar Kiên Giang (Rạch Sỏi)",
  "Cinestar Sinh Viên (Bình Dương)",
  "Cinestar Lâm Đồng (Đức Trọng)",
];

const Header = () => {
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  let timeoutId = null;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsCinemaOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsCinemaOpen(false);
    }, 300);
  };

  return (
    <header className="bg-[#0C1C36] text-white p-4 shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="/logo.png" alt="Cinestar Logo" className="h-12 mr-2 cursor-pointer" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Tìm phim, rạp"
            className="w-full px-4 py-2 rounded-full bg-gray-800 text-white outline-none"
          />
          <Search className="absolute right-3 top-3 text-gray-400" size={18} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Nút đặt vé */}
          <button
            onClick={() => navigate("/booking")}
            className="bg-[#FFD700] text-black font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#FFC107]"
          >
            ĐẶT VÉ NGAY
          </button>

          {/* Nút đặt bắp nước */}
          <button
            onClick={() => navigate("/concession")}
            className="bg-[#9C27B0] text-white font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#6A1B9A]"
          >
            ĐẶT BẮP NƯỚC
          </button>

          {/* User Menu */}
          <div className="relative group">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <User size={24} />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200 transition-all duration-200">
                  Hồ sơ
                </Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200 transition-all duration-200">
                  Cài đặt
                </Link>
                <Link to="/logout" className="block px-4 py-2 text-red-500 hover:bg-gray-200 transition-all duration-200">
                  Đăng xuất
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto mt-4 flex justify-center gap-6 text-gray-400">
        {/* Chọn Rạp - Dropdown */}
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <button className="flex items-center gap-2 hover:text-yellow-300">📍 Chọn rạp</button>

          {/* Dropdown danh sách rạp */}
          {isCinemaOpen && (
            <div className="absolute left-0 top-full bg-[#0C1C36] border border-gray-700 shadow-lg rounded-md p-4 w-[600px] mt-2 z-50">
              <div className="grid grid-cols-2 gap-4">
                {cinemas.map((cinema, index) => (
                  <span key={index} className="text-white hover:text-yellow-400 cursor-pointer transition">
                    {cinema}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link to="/showtime" className="hover:text-white transition-all">📅 Lịch chiếu</Link>
        <Link to="/promotions" className="hover:text-white transition-all">Khuyến mãi</Link>
        <Link to="/event-rental" className="hover:text-white transition-all">Thuê sự kiện</Link>
        <Link to="/entertainment" className="hover:text-white transition-all">Tất cả giải trí</Link>
        <Link to="/about-us" className="hover:text-white transition-all">Giới thiệu</Link>
      </nav>
    </header>
  );
};

export default Header;
