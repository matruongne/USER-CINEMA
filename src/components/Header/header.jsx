import React from 'react';
import { Search, User, ChevronDown } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-[#0C1C36] text-white p-4 shadow-md relative z-50">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <img src="/logo.png" alt="Cinestar Logo" className="h-12 mr-2" />
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
                    <button className="bg-[#FFD700] text-black font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#FFC107]">
                        ĐẶT VÉ NGAY
                    </button>
                    <button className="bg-[#9C27B0] text-white font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#6A1B9A]">
                        ĐẶT BẮP NƯỚC
                    </button>

                    {/* User Menu */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-md  transition-all duration-300">
                            <User size={24} />
                            
                        </button>

                        {/* Dropdown Menu - Hiển thị khi hover */}
                        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <a href="/profile" className="block px-4 py-2 hover:bg-gray-200 transition-all duration-200">
                                Hồ sơ
                            </a>
                            <a href="/settings" className="block px-4 py-2 hover:bg-gray-200 transition-all duration-200">
                                Cài đặt
                            </a>
                            <a href="/logout" className="block px-4 py-2 text-red-500 hover:bg-gray-200 transition-all duration-200">
                                Đăng xuất
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="container mx-auto mt-4 flex justify-center gap-6 text-gray-400">
                <a href="#" className="flex items-center gap-2 hover:text-white transition-all duration-300">
                    <span>📍</span> Chọn rạp
                </a>
                <a href="/showtime" className="flex items-center gap-2 hover:text-white transition-all duration-300">
                    <span>📅</span> Lịch chiếu
                </a>
                <a href="#" className="hover:text-white transition-all duration-300">Khuyến mãi</a>
                <a href="#" className="hover:text-white transition-all duration-300">Thuê sự kiện</a>
                <a href="#" className="hover:text-white transition-all duration-300">Tất cả các giải trí</a>
                <a href="#" className="hover:text-white transition-all duration-300">Giới thiệu</a>
            </nav>
        </header>
    );
};

export default Header;
