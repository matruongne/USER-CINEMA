import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

const Contact = () => {
	return (
		<div className="min-h-screen bg-gradient-to-b from-[#0B0F2A] to-[#15173A] flex items-center justify-center p-4">
			<div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
				{/* Bên trái: Facebook + Zalo */}
				<div className="flex flex-col items-center justify-center text-center gap-6">
					<h2 className="text-3xl font-bold uppercase">Liên hệ với chúng tôi</h2>

					<div className="flex flex-col items-center gap-6">
						{/* Facebook Button */}
						<a
							href="https://www.facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							className="group relative bg-gradient-to-r from-purple-500 to-blue-500 w-80 py-4 rounded-md font-bold text-lg shadow-lg transition-transform hover:scale-105"
						>
							<div className="flex justify-center items-center">FACEBOOK</div>
							<img
								src="/icons/fb.jpg"
								alt="Facebook"
								className="absolute -left-12 top-1/2 -translate-y-1/2 w-24 h-24 object-contain pointer-events-none group-hover:scale-110 transition-transform"
							/>
						</a>

						{/* Zalo Button */}
						<a
							href="https://zalo.me"
							target="_blank"
							rel="noopener noreferrer"
							className="group relative bg-gradient-to-r from-purple-500 to-blue-500 w-80 py-4 rounded-md font-bold text-lg shadow-lg transition-transform hover:scale-105"
						>
							<div className="flex justify-center items-center">ZALO CHAT</div>
							<img
								src="/icons/zalo.jpg"
								alt="Zalo"
								className="absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-24 object-contain pointer-events-none group-hover:scale-110 transition-transform"
							/>
						</a>
					</div>
				</div>

				{/* Bên phải: Form và thông tin liên hệ */}
				<div className="bg-[#2D5FCF] p-6 rounded-lg shadow-lg">
					<h3 className="text-xl font-bold mb-4">THÔNG TIN LIÊN HỆ</h3>
					<ul className="mb-6 space-y-2 text-sm">
						<li className="flex items-center gap-2">
							<Mail size={16} /> cskh@bookingcinema.com.vn
						</li>
						<li className="flex items-center gap-2">
							<Phone size={16} /> 1900.0085
						</li>
						<li className="flex items-center gap-2">
							<MapPin size={16} /> 135 Hai Bà Trưng, phường Bến Nghé, Quận 1, TPHCM
						</li>
					</ul>

					{/* Form liên hệ */}
					<form className="space-y-4">
						<input
							type="text"
							placeholder="Họ và tên"
							className="w-full p-3 rounded-md text-black"
							required
						/>
						<input
							type="email"
							placeholder="Điền email"
							className="w-full p-3 rounded-md text-black"
							required
						/>
						<textarea
							placeholder="Thông tin liên hệ hoặc phản ánh"
							rows="5"
							className="w-full p-3 rounded-md text-black"
							required
						></textarea>
						<button
							type="submit"
							className="bg-[#FFD700] text-black font-bold py-3 px-6 rounded-md w-full hover:bg-yellow-400 transition"
						>
							GỬI NGAY
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Contact
