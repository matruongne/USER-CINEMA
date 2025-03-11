import React from 'react';
import { Search, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-[#0c0f1c] text-white p-4">
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
                    <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg">ĐẶT VÉ NGAY</button>
                    <button className="bg-purple-600 text-white font-bold px-4 py-2 rounded-lg">ĐẶT BẮP NƯỚC</button>
                    <User className="text-white" size={24} />
                </div>
            </div>

            {/* Navigation */}
            <nav className="container mx-auto mt-4 flex justify-center gap-6 text-gray-400">
                <a href="#" className="flex items-center gap-2">
                    <span>📍</span> Chọn rạp
                </a>
                <a href="#" className="flex items-center gap-2">
                    <span>📅</span> Lịch chiếu
                </a>
                <a href="#">Khuyến mãi</a>
                <a href="#">Thuê sự kiện</a>
                <a href="#">Tất cả các giải trí</a>
                <a href="#">Giới thiệu</a>
            </nav>
        </header>
    );
};

export default Header;
