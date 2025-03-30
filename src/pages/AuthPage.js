import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Tabs */}
        <div className="flex">
          <button
            className={`flex-1 py-3 text-lg font-semibold border-b-4 ${
              isLogin ? "border-yellow-400 text-black" : "border-gray-300 text-gray-600"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Đăng nhập
          </button>
          <button
            className={`flex-1 py-3 text-lg font-semibold border-b-4 ${
              !isLogin ? "border-yellow-400 text-black" : "border-gray-300 text-gray-600"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Đăng ký
          </button>
        </div>

        {/* Nội dung Form */}
        <div className="mt-6">{isLogin ? <LoginForm /> : <RegisterForm />}</div>
      </div>
    </div>
  );
};

// Component Đăng Nhập
const LoginForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-gray-700">Tài khoản hoặc Email *</label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">Mật khẩu *</label>
        <input
          type="password"
          required
          className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500"
      >
        ĐĂNG NHẬP
      </button>
    </form>
  );
};

// Component Đăng Ký
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cccd: "",
    password: "",
    confirmPassword: "",
    agree: false, // Điều khoản chính sách bảo mật
  });

  const [showTerms, setShowTerms] = useState(false); // Toggle điều khoản

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Kiểm tra form hợp lệ
  const validate = () => {
    if (!formData.agree) return false;
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.cccd &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    );
  };

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Dữ liệu hợp lệ:", formData);
      alert("Đăng ký thành công!");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700">Họ và tên *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Số điện thoại *</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">CCCD *</label>
        <input
          type="text"
          name="cccd"
          value={formData.cccd}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Mật khẩu *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Xác nhận mật khẩu *</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      {/* Điều khoản chính sách */}
      <div>
  <button
    type="button"
    className="text-blue-500"
    onClick={() => setShowTerms(!showTerms)}
  >
    {showTerms ? "Ẩn điều khoản" : "Xem điều khoản sử dụng"}
  </button>
  {showTerms && (
    <p className="text-gray-600 text-sm mt-2 p-2 rounded-lg">
      1. Thông tin chúng tôi thu thập:<br /><br />
      Thông tin bạn cung cấp: Họ tên, ngày sinh, giới tính, địa chỉ, số điện thoại, CMND/CCCD/hộ chiếu, thông tin thanh toán, email.<br />
      Thông tin tự động thu thập: Địa chỉ IP, loại trình duyệt, hệ điều hành, thông tin truy cập website.<br /><br />
      2. Mục đích sử dụng thông tin:<br /><br />
      Cung cấp dịch vụ và sản phẩm.<br />
      Xác nhận giao dịch và liên lạc với bạn.<br />
      Quản lý website và gửi thông tin khuyến mại.<br />
      Bảo vệ quyền lợi của bạn và ngăn chặn gian lận.<br />
      Giải quyết các vấn đề phát sinh.<br /><br />
      3. Lưu trữ và bảo mật thông tin:<br /><br />
      Chúng tôi lưu trữ và bảo mật thông tin của bạn bằng các biện pháp an toàn.<br />
      Chúng tôi không chia sẻ thông tin của bạn với bên thứ ba trừ khi có sự đồng ý của bạn hoặc theo yêu cầu của pháp luật.<br />
      Thông tin được lưu trữ tối đa 12 tháng kể từ khi khách hàng đóng tài khoản.<br /><br />
      4. Quyền của bạn:<br /><br />
      Bạn có quyền truy cập, chỉnh sửa, xóa và rút lại sự đồng ý đối với thông tin cá nhân của mình.<br />
      Bạn có quyền khiếu nại, tố cáo hoặc khởi kiện theo quy định của pháp luật.<br /><br />
      5. Thay đổi chính sách:<br /><br />
      Chúng tôi có thể cập nhật chính sách này theo thời gian.<br />
      Chúng tôi sẽ thông báo cho bạn về những thay đổi quan trọng.<br /><br />
      6. Liên hệ:<br /><br />
      Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua hotline hoặc email.
    </p>
  )}
</div>

      {/* Checkbox đồng ý chính sách bảo mật */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className="mr-2"
          required
        />
        <label className="text-gray-700">
          Tôi đồng ý với{" "}
          <span className="text-blue-500 cursor-pointer">Chính sách bảo mật</span>
        </label>
      </div>

      {/* Nút đăng ký bị disable nếu chưa tích checkbox */}
      <button
        type="submit"
        className={`w-full py-2 rounded-lg font-semibold ${
          formData.agree ? "bg-yellow-400 text-black hover:bg-yellow-500" : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!formData.agree}
      >
        ĐĂNG KÝ
      </button>
    </form>
  );
};

export default AuthPage;
