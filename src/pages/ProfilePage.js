import React, { useState, useRef } from "react";
import {
  FaUser,
  FaStar,
  FaClock,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import MembershipPage from "./MembershipPage";

const ProfilePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedTab, setSelectedTab] = useState("info");
  const [formData, setFormData] = useState({
    fullName: "Phan Hồ Như Trọng",
    dob: "2003-06-11",
    phone: "0387567498",
    email: "Beoruiden123124125@gmail.com",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = () => alert("Thông tin đã được cập nhật.");

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Xác thực mật khẩu không khớp.");
      return;
    }
    alert("Đổi mật khẩu thành công.");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => fileInputRef.current.click();

  return (
    <div className="flex min-h-screen bg-[#0e1133] text-white">
      {/* Sidebar */}
      <aside
        className={`$${
          isCollapsed ? "w-24" : "w-64"
        } m-4 rounded-xl bg-gradient-to-b from-[#4d4fac] to-[#3459ad] p-4 flex flex-col justify-between shadow-xl transition-all duration-300`}
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
            className={`$${
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
              className={`flex items-center space-x-2 hover:text-yellow-300 ${
                selectedTab === "info" ? "text-yellow-400 font-semibold" : ""
              }`}
              title="Thông tin khách hàng"
              onClick={() => setSelectedTab("info")}
            >
              <FaUser />
              {!isCollapsed && <span>Thông tin khách hàng</span>}
            </button>
            <button
              className={`flex items-center space-x-2 hover:text-yellow-300 ${
                selectedTab === "member" ? "text-yellow-400 font-semibold" : ""
              }`}
              title="Thành viên Cinestar"
              onClick={() => setSelectedTab("member")}
            >
              <FaStar />
              {!isCollapsed && <span>Thành viên Cinestar</span>}
            </button>
            <button
              className="flex items-center space-x-2 hover:text-yellow-300"
              title="Lịch sử mua hàng"
            >
              <FaClock />
              {!isCollapsed && <span>Lịch sử mua hàng</span>}
            </button>
          </nav>
        </div>

        <button
          className="flex items-center space-x-2 mt-6 hover:text-yellow-300"
          title="Đăng xuất"
        >
          <FaSignOutAlt />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {selectedTab === "info" ? (
          <>
            <h1 className="text-2xl font-bold mb-6">THÔNG TIN KHÁCH HÀNG</h1>
            <section className="bg-white text-black p-6 mb-6 rounded shadow-md">
              <h2 className="text-lg font-bold mb-4">Thông tin cá nhân</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Ngày sinh</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
              </div>
              <button
                onClick={handleUpdate}
                className="mt-4 px-4 py-2 bg-[#ffcc00] text-black font-bold rounded"
              >
                LƯU THÔNG TIN
              </button>
            </section>

            <section className="bg-white text-black p-6 rounded shadow-md">
              <h2 className="text-lg font-bold mb-4">Đổi mật khẩu</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Mật khẩu cũ *</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Mật khẩu mới *</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Xác thực mật khẩu *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border p-2"
                  />
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                className="mt-4 px-4 py-2 bg-[#ffcc00] text-black font-bold rounded"
              >
                ĐỔI MẬT KHẨU
              </button>
            </section>
          </>
        ) : (
          <MembershipPage />
        )}
      </main>
    </div>
  );
};

export default ProfilePage;