import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaStar, FaClock, FaSignOutAlt, FaBars } from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumb";

const mockTickets = [
  {
    id: "VE123456",
    movie: "Godzilla x Kong: The New Empire",
    date: "10/04/2025",
    time: "19:00",
    cinema: "Cinestar Quốc Thanh",
    room: "Phòng 5",
    seats: ["E7", "E8"],
    total: 200000,
  },
  {
    id: "VE123457",
    movie: "Dune: Part Two",
    date: "02/04/2025",
    time: "21:15",
    cinema: "Cinestar Hai Bà Trưng",
    room: "Phòng 3",
    seats: ["C3"],
    total: 95000,
  },
];

const PurchaseHistoryPage = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => fileInputRef.current.click();

  // Hàm xử lý chuyển tab
  const handleTabChange = (tab) => {
    if (tab === "info") {
      navigate("/profile");
    } else if (tab === "member") {
      navigate("/profile?tab=member");
    }
  };

  const breadcrumbItems = [
    { label: "Tài khoản", path: "/profile" },
    { label: "Lịch sử mua hàng", path: "/profile/history" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0e1133] text-white">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-24" : "w-64"
        } m-4 rounded-xl bg-gradient-to-b from-[#4d4fac] to-[#3459ad] p-4 flex flex-col justify-between shadow-xl transition-all duration-300 h-[calc(100vh-6rem)]`}
      >
        <div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white mb-6"
            title="Thu gọn/Mở rộng"
          >
            <FaBars />
          </button>

          <div className="flex flex-col items-center text-center mb-6">
            <div
              className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow cursor-pointer"
              onClick={handleAvatarClick}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-black text-sm">
                  No Img
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
            {!isCollapsed && (
              <>
                <div className="mt-2 font-semibold">Phan Hồ Như Trọng</div>
                <button
                  className="text-xs text-yellow-400 underline hover:text-yellow-300"
                  onClick={handleAvatarClick}
                >
                  Thay đổi ảnh đại diện
                </button>
              </>
            )}
          </div>

          <div
            className={`${
              isCollapsed ? "text-xs" : "text-base"
            } bg-[#ffe100] text-black font-bold text-center py-1 rounded mb-4`}
          >
            {isCollapsed ? "CF" : "C'Friends"}
          </div>

          {!isCollapsed && (
            <>
              <div className="text-sm">Tích điểm C'Friends</div>
              <div className="text-red-500 font-semibold mb-4">0/10K</div>
            </>
          )}

          <nav className="space-y-4 mt-4">
            <button
              className={`flex items-center w-full ${
                isCollapsed ? "justify-center" : "space-x-2"
              } hover:text-yellow-300`}
              title="Thông tin khách hàng"
              onClick={() => handleTabChange("info")}
            >
              <FaUser className={isCollapsed ? "mx-auto" : ""} />
              {!isCollapsed && <span>Thông tin khách hàng</span>}
            </button>
            <button
              className={`flex items-center w-full ${
                isCollapsed ? "justify-center" : "space-x-2"
              } hover:text-yellow-300`}
              title="Thành viên Cinestar"
              onClick={() => handleTabChange("member")}
            >
              <FaStar className={isCollapsed ? "mx-auto" : ""} />
              {!isCollapsed && <span>Thành viên Cinestar</span>}
            </button>
            <button
              className={`flex items-center w-full ${
                isCollapsed ? "justify-center" : "space-x-2"
              } text-yellow-400 font-semibold`}
              title="Lịch sử mua hàng"
              onClick={() => navigate("/profile/history")}
            >
              <FaClock className={isCollapsed ? "mx-auto" : ""} />
              {!isCollapsed && <span>Lịch sử mua hàng</span>}
            </button>
          </nav>
        </div>

        <button
          className={`flex items-center w-full ${
            isCollapsed ? "justify-center" : "space-x-2"
          } mt-6 hover:text-yellow-300`}
          title="Đăng xuất"
        >
          <FaSignOutAlt className={isCollapsed ? "mx-auto" : ""} />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-2xl font-bold mb-6">LỊCH SỬ MUA HÀNG</h1>

        {mockTickets.length === 0 ? (
          <p className="text-center text-lg mt-10">Không có dữ liệu!</p>
        ) : (
          <div className="space-y-4">
            {mockTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-gradient-to-r from-[#3c3c88] to-[#2c2c60] p-5 rounded-xl shadow-lg border border-white/10"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{ticket.movie}</h2>
                  <span className="text-sm text-yellow-400 font-semibold">
                    Mã vé: {ticket.id}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <span className="font-semibold">Ngày chiếu:</span>{" "}
                    {ticket.date}
                  </p>
                  <p>
                    <span className="font-semibold">Giờ chiếu:</span>{" "}
                    {ticket.time}
                  </p>
                  <p>
                    <span className="font-semibold">Rạp:</span> {ticket.cinema}
                  </p>
                  <p>
                    <span className="font-semibold">Phòng:</span> {ticket.room}
                  </p>
                  <p>
                    <span className="font-semibold">Ghế:</span>{" "}
                    {ticket.seats.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold">Tổng tiền:</span>{" "}
                    {ticket.total.toLocaleString()}đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PurchaseHistoryPage;
