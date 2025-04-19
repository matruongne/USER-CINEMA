import React, { useState } from "react";
import { Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import cinemas from "../../data/cinemas";

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

  const handleCinemaClick = (slug) => {
    navigate(`/showtime/${slug}`);
  };

  return (
    <header className="bg-bgColor text-white p-4 shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Cinestar Logo"
              className="h-12 mr-2 cursor-pointer"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Tìm phim, rạp"
            className="w-full px-4 py-2 rounded-full bg-primary outline-none text-black"
          />
          <button className="p-2 bg-secondary absolute w-[40px] h-[40px] rounded-r-full right-0 top-0 hover:bg-secondary/80">
            <Search className=" text-white" size={18} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Nút đặt bắp nước */}
          <button
            onClick={() => navigate("/food")}
            className="bg-primary text-white font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary/60"
          >
            ĐẶT BẮP NƯỚC
          </button>

          {/* Nút đặt vé */}
          <button
            onClick={() => navigate("/booking")}
            className="bg-secondary text-white font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-secondary/60"
          >
            ĐẶT VÉ NGAY
          </button>

          {/* Nút profile */}
          <button
            onClick={() => navigate("/profile")}
            className="text-white font-bold ml-14 px-2 py-2 rounded-lg transition-all duration-300 hover:bg-third/60 flex items-center gap-2"
          >
            <User size={25} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto mt-4 flex justify-center gap-6 text-gray-400">
        {/* Chọn Rạp - Dropdown */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center gap-2 hover:text-primary text-white">
            📍 Chọn rạp
          </button>

          {/* Dropdown danh sách rạp */}
          {isCinemaOpen && (
            <div className="absolute left-0 top-full bg-bgColor border border-gray-700 shadow-lg rounded-md p-4 w-[600px] mt-2 z-50">
              <div className="grid grid-cols-2 gap-4">
                {cinemas.map((cinema, index) => (
                  <span
                    key={index}
                    className="text-white hover:text-yellow-400 cursor-pointer transition"
                    onClick={() => handleCinemaClick(cinema.slug)}
                  >
                    {cinema.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link
          to="/showtime"
          className="hover:text-primary text-white transition-all"
        >
          📅 Lịch chiếu
        </Link>
        <Link
          to="/promotions"
          className="hover:text-primary text-white transition-all"
        >
          Khuyến mãi
        </Link>
        <Link
          to="/event-rental"
          className="hover:text-primary text-white transition-all"
        >
          Thuê sự kiện
        </Link>
        <Link
          to="/entertainment"
          className="hover:text-primary text-white transition-all"
        >
          Tất cả giải trí
        </Link>
        <Link
          to="/about-us"
          className="hover:text-primary text-white transition-all"
        >
          Giới thiệu
        </Link>
      </nav>
    </header>
  );
};

export default Header;
