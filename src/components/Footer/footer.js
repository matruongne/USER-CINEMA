import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import { FaTiktok } from 'react-icons/fa'
import { getTheaters, selectTheaters } from '../../redux/Slices/Theater/theaterSlice'
import { useDispatch, useSelector } from 'react-redux'

const Footer = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTheaters({}))
	}, [dispatch])

	const allTheaters = useSelector(selectTheaters)

	function createSlug(cinema) {
		const { name, theater_id } = cinema

		let slug = name
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/đ/g, 'd')
			.replace(/Đ/g, 'D')
			.toLowerCase()
			.trim()

			.replace(/[^a-z0-9\s-]/g, ' ')
			.replace(/[\s-]+/g, '-')
		return `${slug}-${theater_id}`
	}

	return (
		<footer className="bg-gradient-to-r from-[#a82bf5] to-[#2b0b61] text-white py-10">
			<div className="container mx-auto px-8">
				<div className="text-center mb-8">
					<img src="/logo.png" alt="BookingCinema Logo" className="mx-auto h-36" />
					<p className="text-lg font-semibold mt-2">BE HAPPY, BE A STAR</p>
					<div className="flex justify-center gap-4 mt-4">
						<Link
							to="/booking"
							className="bg-[#FFD700] text-black font-bold px-6 py-2 rounded-md hover:bg-[#FFC107] transition"
						>
							ĐẶT VÉ
						</Link>
						{/* <Link
							to="/food"
							className="border-2 border-[#FFD700] text-[#FFD700] font-bold px-6 py-2 rounded-md hover:bg-[#FFD700] hover:text-black transition"
						>
							ĐẶT BẮP NƯỚC
						</Link> */}
					</div>
				</div>

				<div className="grid grid-cols-5 gap-8">
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

					<div>
						<h3 className="text-lg font-bold mb-3">HỆ THỐNG RẠP</h3>
						<ul className="space-y-2">
							{allTheaters?.map(theater => (
								<li key={theater.theater_id}>
									<Link to={`/showtime/${createSlug(theater)}`} className="hover:text-yellow-300">
										{theater.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

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

				<div className="text-center mt-10 border-t border-gray-700 pt-4">
					<p className="text-sm">© 2023 BookingCinema. All rights reserved.</p>
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
	)
}

export default Footer
