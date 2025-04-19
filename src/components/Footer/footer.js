import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#a82bf5] to-[#2b0b61] text-white py-10">
      <div className="container mx-auto px-8">
        {/* Logo + Nút đặt vé */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Cinestar Logo" className="mx-auto h-16" />
          <p className="text-lg font-semibold mt-2">BE HAPPY, BE A STAR</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              to="/booking"
              className="bg-[#FFD700] text-black font-bold px-6 py-2 rounded-md hover:bg-[#FFC107] transition"
            >
              ĐẶT VÉ
            </Link>
            <Link
              to="/food"
              className="border-2 border-[#FFD700] text-[#FFD700] font-bold px-6 py-2 rounded-md hover:bg-[#FFD700] hover:text-black transition"
            >
              ĐẶT BẮP NƯỚC
            </Link>
          </div>
        </div>

        {/* Nội dung chính của footer */}
        <div className="grid grid-cols-5 gap-8">
          {/* Cột 1 - Tài khoản */}
          <div>
            <h3 className="text-lg font-bold mb-3">TÀI KHOẢN</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/auth" className="hover:text-yellow-300">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-yellow-300">
                  Đăng ký
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-yellow-300">
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 2 - Thuê sự kiện */}
          <div>
            <h3 className="text-lg font-bold mb-3">THUÊ SỰ KIỆN</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/rent-cinema" className="hover:text-yellow-300">
                  Thuê rạp
                </Link>
              </li>
              <li>
                <Link to="/event-services" className="hover:text-yellow-300">
                  Các loại hình cho thuê khác
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3 - Xem phim */}
          <div>
            <h3 className="text-lg font-bold mb-3">XEM PHIM</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/now-showing" className="hover:text-yellow-300">
                  Phim đang chiếu
                </Link>
              </li>
              <li>
                <Link to="/coming-soon" className="hover:text-yellow-300">
                  Phim sắp chiếu
                </Link>
              </li>
              <li>
                <Link to="/special-showtimes" className="hover:text-yellow-300">
                  Suất chiếu đặc biệt
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4 - Dịch vụ khác */}
          <div>
            <h3 className="text-lg font-bold mb-3">DỊCH VỤ KHÁC</h3>
            <ul className="space-y-2">
              <li>Nhà hàng</li>
              <li>Kidzone</li>
              <li>Bowling</li>
              <li>Billiards</li>
              <li>Gym</li>
              <li>Nhà hát Opera</li>
              <li>Coffee</li>
            </ul>
          </div>

          {/* Cột 5 - Hệ thống rạp */}
          <div>
            <h3 className="text-lg font-bold mb-3">HỆ THỐNG RẠP</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/showtime" className="hover:text-yellow-300">
                  Tất cả hệ thống rạp
                </Link>
              </li>
              <li>
                <Link
                  to="/showtime/cinestar-quoc-thanh"
                  className="hover:text-yellow-300"
                >
                  Cinestar Quốc Thanh (TP.HCM)
                </Link>
              </li>
              <li>
                <Link
                  to="/showtime/cinestar-hai-ba-trung"
                  className="hover:text-yellow-300"
                >
                  Cinestar Hai Bà Trưng (TP.HCM)
                </Link>
              </li>
              <li>
                <Link
                  to="/showtime/cinestar-sinh-vien"
                  className="hover:text-yellow-300"
                >
                  Cinestar Sinh Viên (Bình Dương)
                </Link>
              </li>
              <li>
                <Link
                  to="/showtime/cinestar-my-tho"
                  className="hover:text-yellow-300"
                >
                  Cinestar Mỹ Tho (Tiền Giang)
                </Link>
              </li>
              <li>
                <Link
                  to="/showtime/cinestar-kien-giang"
                  className="hover:text-yellow-300"
                >
                  Cinestar Kiên Giang (Rạch Sỏi)
                </Link>
              </li>
              <li>
                <Link
                  to="/showtime/cinestar-lam-dong"
                  className="hover:text-yellow-300"
                >
                  Cinestar Lâm Đồng (Đức Trọng)
                </Link>
              </li>
              <li>
                <Link
                  to="/showtime/cinestar-da-lat"
                  className="hover:text-yellow-300"
                >
                  Cinestar Đà Lạt (TP. Đà Lạt)
                </Link>
              </li>
              <li>
                <Link
                  to="/showtime/cinestar-hue"
                  className="hover:text-yellow-300"
                >
                  Cinestar Huế (TP. Huế)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mt-10">
          <div className="flex justify-center gap-6">
            <Link to="#" className="text-2xl hover:text-yellow-300">
              <Facebook />
            </Link>
            <Link to="#" className="text-2xl hover:text-yellow-300">
              <FaTiktok />
            </Link>
            <Link to="#" className="text-2xl hover:text-yellow-300">
              <Youtube />
            </Link>
            <Link to="#" className="text-2xl hover:text-yellow-300">
              <Instagram />
            </Link>
          </div>
        </div>

        {/* Chính sách & Copyright */}
        <div className="text-center mt-10 border-t border-gray-700 pt-4">
          <p className="text-sm">© 2023 Cinestar. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-2 text-sm">
            <Link to="#" className="hover:text-yellow-300">
              Chính sách bảo mật
            </Link>
            <Link to="#" className="hover:text-yellow-300">
              Tin điện ảnh
            </Link>
            <Link to="#" className="hover:text-yellow-300">
              Hỏi và đáp
            </Link>
          </div>
          <div className="mt-4">
            <img
              src="/public/icons/bộ công thương.webp"
              alt="Đã thông báo bộ công thương"
              className="h-10 mx-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
