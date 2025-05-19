import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaStar, FaClock, FaSignOutAlt, FaBars } from 'react-icons/fa'
import Breadcrumb from '../components/Breadcrumb'
import { signOutAsync } from '../redux/Slices/Auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
	getLoggedInUserAsync,
	selectUserInfo,
	updateUserAsync,
} from '../redux/Slices/User/userSlice'
import {
	cancelBooking,
	getBookingHistory,
	selectBookingHistory,
} from '../redux/Slices/Booking/bookingSlice'
import ImagetoBase64 from '../utils/ImagetoBase64'
import { UploadImage } from '../components/UploadImage'
import toast from 'react-hot-toast'

const PurchaseHistoryPage = () => {
	const navigate = useNavigate()
	const [isCollapsed, setIsCollapsed] = useState(() => {
		const saved = localStorage.getItem('sidebarCollapsed')
		return saved ? JSON.parse(saved) : false
	})

	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfo)?.data
	const bookingHistory = useSelector(selectBookingHistory)

	const [avatarPreview, setAvatarPreview] = useState(null)
	const fileInputRef = useRef(null)

	const [selectedBooking, setSelectedBooking] = useState(null)
	const [showConfirmModal, setShowConfirmModal] = useState(false)
	const [refundAmount, setRefundAmount] = useState(0)

	const handleCancelClick = booking => {
		const showTime = new Date(
			`${booking.Showtime.ShowDate.show_date}T${booking.Showtime.show_time}`
		)
		const now = new Date()
		const hoursUntilShowtime = (showTime - now) / (1000 * 60 * 60)

		let refund = 0
		const price = Number(booking.total_price)

		if (hoursUntilShowtime >= 6) refund = price
		else if (hoursUntilShowtime >= 3) refund = price * 0.5
		else if (hoursUntilShowtime >= 1) refund = price * 0.3
		else refund = 0

		setRefundAmount(refund)
		setSelectedBooking(booking)
		setShowConfirmModal(true)
	}

	const confirmCancelBooking = async () => {
		try {
			// dispatch action cancel booking (implement it if needed)
			await dispatch(cancelBooking(selectedBooking.booking_id)).unwrap()
			setShowConfirmModal(false)
			dispatch(getBookingHistory())
		} catch (err) {}
	}

	useEffect(() => {
		localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed))
	}, [isCollapsed])

	useEffect(() => {
		dispatch(getLoggedInUserAsync())
		dispatch(getBookingHistory())
	}, [dispatch])

	const handleAvatarChange = e => {
		e.preventDefault()

		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => setAvatarPreview(reader.result)
			reader.readAsDataURL(file)

			ImagetoBase64(file).then(async result => {
				const data = await UploadImage(result)

				if (data.data.secure_url) {
					await dispatch(
						updateUserAsync({
							avatarUrl: data.data.secure_url,
						})
					)
						.unwrap()
						.then(_ => {
							toast.success('Cập nhật ảnh đại diện thành công')
						})
						.catch(_ => {
							toast.error('Cập nhật ảnh đại diện thất bại')
						})
				}
			})
		}
	}

	const handleSignOut = () => {
		dispatch(signOutAsync())
		window.location.replace('/')
	}

	const handleAvatarClick = () => fileInputRef.current.click()
	const handleTabChange = tab => {
		if (tab === 'info') navigate('/profile')
		else if (tab === 'member') navigate('/profile?tab=member')
	}

	const breadcrumbItems = [
		{ label: 'Tài khoản', path: '/profile' },
		{ label: 'Lịch sử mua hàng', path: '/profile/history' },
	]

	const renderSection = (title, items) => {
		const showCancelButton = booking => {
			const { Showtime } = booking
			const showDate = new Date(Showtime.ShowDate.show_date)
			const showTime = new Date(`${Showtime.ShowDate.show_date}T${Showtime.show_time}`)
			const now = new Date()
			const diffInMs = showTime - now
			const diffInHours = diffInMs / (1000 * 60 * 60)
			return diffInHours >= 1 && ['COMPLETED', 'PENDING'].includes(booking.payment_status)
		}

		return (
			<div>
				<h2 className="text-xl font-semibold mt-6 mb-3">{title}</h2>
				{!items ? (
					<p className="text-center text-gray-400">Không có mục nào</p>
				) : (
					items?.map(booking => {
						const seats = JSON.parse(booking.seats)
						const { Showtime } = booking
						const showDate = Showtime.ShowDate.show_date
						const showTime = Showtime.show_time
						const screenShowtime = Showtime.ScreenShowtimes[0]
						const screenName = screenShowtime.Screen.screen_name
						const theaterName = screenShowtime.Screen.Theater.name
						return (
							<div
								key={booking.booking_id}
								className="bg-gradient-to-r from-[#3c3c88] to-[#2c2c60] p-5 rounded-xl shadow-lg border border-white/10 mb-12"
							>
								<div className="flex justify-between items-center mb-2">
									<h3 className="text-lg font-semibold">{Showtime.ShowDate.Movie.title}</h3>
									<span className="text-sm text-yellow-400 font-semibold">
										Mã vé: {booking.booking_id}
									</span>
								</div>
								<div className="grid grid-cols-2 gap-2 text-sm">
									<p>
										<span className="font-semibold">Ngày chiếu:</span>{' '}
										{new Date(showDate).toLocaleDateString('vi-VN')}
									</p>
									<p>
										<span className="font-semibold">Giờ chiếu:</span> {showTime.slice(0, 5)}
									</p>
									<p>
										<span className="font-semibold">Rạp:</span> {theaterName}
									</p>
									<p>
										<span className="font-semibold">Phòng:</span> {screenName}
									</p>
									<p>
										<span className="font-semibold">Ghế:</span>{' '}
										{seats?.map(s => s.seat_code).join(', ')}
									</p>
									<p>
										<span className="font-semibold">Tổng tiền:</span>{' '}
										{Number(booking.total_price).toLocaleString()}đ
									</p>
								</div>
								{showCancelButton(booking) && (
									<button
										className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
										onClick={() => handleCancelClick(booking)}
									>
										Huỷ vé
									</button>
								)}
							</div>
						)
					})
				)}
			</div>
		)
	}

	return (
		<div className="flex min-h-screen bg-[#0e1133] text-white">
			{/* Sidebar */}
			<aside
				className={`${
					isCollapsed ? 'w-24' : 'w-64'
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
							{avatarPreview || userInfo?.avatarUrl ? (
								<img
									src={avatarPreview || userInfo?.avatarUrl}
									alt="Avatar"
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center bg-gray-300 text-black text-sm">
									<FaUser className="text-2xl" />
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
								<div className="mt-2 font-semibold">{userInfo?.username || ''}</div>
								<button
									className="text-xs text-yellow-400 underline hover:text-yellow-300"
									onClick={handleAvatarClick}
								>
									Thay đổi ảnh đại diện
								</button>
							</>
						)}
					</div>

					<nav className="space-y-4 mt-4">
						<button
							className={`flex items-center w-full ${
								isCollapsed ? 'justify-center' : 'space-x-2'
							} hover:text-yellow-300`}
							title="Thông tin khách hàng"
							onClick={() => handleTabChange('info')}
						>
							<FaUser className={isCollapsed ? 'mx-auto' : ''} />
							{!isCollapsed && <span>Thông tin khách hàng</span>}
						</button>
						<button
							className={`flex items-center w-full ${
								isCollapsed ? 'justify-center' : 'space-x-2'
							} hover:text-yellow-300`}
							title="Ví"
							onClick={() => handleTabChange('member')}
						>
							<FaStar className={isCollapsed ? 'mx-auto' : ''} />
							{!isCollapsed && <span>Ví</span>}
						</button>
						<button
							className={`flex items-center w-full ${
								isCollapsed ? 'justify-center' : 'space-x-2'
							} text-yellow-400 font-semibold`}
							title="Lịch sử mua hàng"
							onClick={() => navigate('/profile/history')}
						>
							<FaClock className={isCollapsed ? 'mx-auto' : ''} />
							{!isCollapsed && <span>Lịch sử mua hàng</span>}
						</button>
					</nav>
				</div>

				<button
					className={`flex items-center w-full ${
						isCollapsed ? 'justify-center' : 'space-x-2'
					} mt-6 hover=text-yellow-300`}
					title="Đăng xuất"
					onClick={handleSignOut}
				>
					<FaSignOutAlt className={isCollapsed ? 'mx-auto' : ''} />
					{!isCollapsed && <span>Đăng xuất</span>}
				</button>
			</aside>

			{/* Main Content */}
			<main className="flex-1 p-8 overflow-auto">
				<Breadcrumb items={breadcrumbItems} />
				<h1 className="text-2xl font-bold mb-6">LỊCH SỬ MUA HÀNG</h1>

				{bookingHistory.status === 'loading' ? (
					<p className="text-center">Đang tải...</p>
				) : (
					<>
						{renderSection('Đã thanh toán', bookingHistory.completed)}
						{renderSection('Đang chờ', bookingHistory.pending)}
						{renderSection('Đã hủy', bookingHistory.canceled)}
					</>
				)}
			</main>
			{showConfirmModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-80 text-center text-black shadow-lg">
						<h2 className="text-lg font-bold mb-3">Xác nhận huỷ vé?</h2>
						<p className="text-sm text-gray-600 mb-2">
							Bạn có chắc muốn huỷ vé{' '}
							<span className="font-semibold">{selectedBooking?.booking_id}</span>?
						</p>
						<p className="text-sm text-green-600 mb-4">
							Số tiền hoàn lại dự kiến:{' '}
							<span className="font-bold text-lg">
								{refundAmount > 0
									? `${refundAmount.toLocaleString()}đ`
									: 'Không đủ điều kiện hoàn tiền'}
							</span>
						</p>
						<div className="flex justify-center gap-4">
							<button
								className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
								onClick={() => setShowConfirmModal(false)}
							>
								Không
							</button>
							<button
								className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
								onClick={confirmCancelBooking}
							>
								Xác nhận
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default PurchaseHistoryPage
