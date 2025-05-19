import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createBooking } from '../redux/Slices/Booking/bookingSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
	getUserWalletAsync,
	selectUserInfo,
	selectUserWallet,
	updateUserWalletAsync,
} from '../redux/Slices/User/userSlice'
import { createTransaction } from '../redux/Slices/Transaction/transactionSlice'

const Checkout = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const user = true

	const {
		cart = [],
		totalPrice = 0,
		selectedSeats = [],
		selectedMovie = null,
		selectedTime = '',
		selectedDate = '',
		selectedCinema = '',
	} = location.state || {}
	const [paymentMethod, setPaymentMethod] = useState('')
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfo)
	const wallet = useSelector(selectUserWallet)

	useEffect(() => {
		if (userInfo?.data?.user_id) {
			dispatch(getUserWalletAsync(userInfo.data.user_id))
		}
	}, [userInfo, dispatch])

	useEffect(() => {
		if (!location.state || !selectedMovie || selectedSeats.length === 0) {
			alert('Vui lòng chọn phim và ghế ngồi trước khi thanh toán!')
			navigate('/')
			return
		}
	}, [location.state, selectedMovie, selectedSeats, navigate])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const handlePayment = () => {
		if (!paymentMethod) {
			alert('Vui lòng chọn phương thức thanh toán!')
			return
		}

		if (!user) {
			localStorage.setItem(
				'pendingCheckout',
				JSON.stringify({
					cart,
					totalPrice,
					paymentMethod,
					selectedSeats,
					selectedMovie,
					selectedTime,
					selectedCinema,
					selectedDate,
				})
			)

			alert('Vui lòng đăng nhập để tiếp tục thanh toán!')
			navigate('/signin', { state: { returnUrl: '/checkout' } })
			return
		}
		const seatIds = selectedSeats.map(seat => seat.seat_id)

		dispatch(
			createBooking({
				showtimeId: selectedTime?.showtime_id,
				seatIds,
				totalPrice,
			})
		).then(result => {
			// if (paymentMethod === 'wallet' && userInfo?.data?.user_id) {
			// 	dispatch(
			// 		updateUserWalletAsync({
			// 			userId: userInfo.data.user_id,
			// 			walletUpdate: { balance: wallet?.balance - totalPrice },
			// 		})
			// 	)
			// }
			dispatch(
				createTransaction({
					booking_id: result?.payload?.booking_id,
					amount: result?.payload?.total_price,
					method: paymentMethod,
				})
			)

			navigate('/checkout-success', {
				state: {
					cart,
					totalPrice,
					paymentMethod,
					selectedSeats,
					selectedMovie,
					selectedTime,
					selectedCinema,
					selectedDate,
				},
			})
		})
	}

	const renderSelectedSeats = () => {
		return selectedSeats.map((seat, index) => (
			<div key={index} className="flex items-center bg-gray-700 p-3 rounded-lg mb-2">
				<p className="text-yellow-400 font-semibold">Ghế: {seat.seat_code}</p>
			</div>
		))
	}

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6 text-center">🛒 Thanh Toán</h1>

				<div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
					<h2 className="text-2xl font-semibold mb-4">Chi Tiết Đơn Hàng</h2>

					{selectedMovie && (
						<div className="mb-6 border-b border-gray-700 pb-4">
							<h3 className="text-lg font-semibold mb-2">Thông tin vé:</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<p>
										<strong>Phim:</strong>{' '}
										<span className="text-xl uppercase font-bold">{selectedMovie.title}</span>
									</p>
									<p>
										<strong>Rạp:</strong> {selectedCinema}
									</p>
								</div>
								<div>
									<p>
										<strong>Ngày chiếu:</strong> {selectedDate}
									</p>
									<p>
										<strong>Suất chiếu:</strong> {selectedTime?.show_time}
									</p>
								</div>
							</div>
						</div>
					)}

					{selectedSeats.length > 0 && (
						<div className="mb-6 border-b border-gray-700 pb-4">
							<h3 className="text-lg font-semibold mb-2">Ghế đã chọn:</h3>
							{renderSelectedSeats()}
						</div>
					)}

					{cart.length > 0 && (
						<div className="mb-6 border-b border-gray-700 pb-4">
							<h3 className="text-lg font-semibold mb-2">Đồ ăn đã chọn:</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{cart.map(item => (
									<div
										key={item.id || item.name}
										className="flex items-center bg-gray-700 p-3 rounded-lg"
									>
										<img
											src={item.image}
											alt={item.name}
											className="w-16 h-16 object-cover rounded-md mr-4"
										/>
										<div>
											<h3 className="text-lg font-medium">{item.name}</h3>
											<p className="text-gray-400">Số lượng: {item.quantity}</p>
											<p className="text-yellow-400 font-semibold">
												{item.price.toLocaleString()} VNĐ
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					<div className="bg-gray-700 p-4 rounded-lg mb-6">
						<h2 className="text-xl font-semibold">Tổng tiền: {totalPrice.toLocaleString()} VNĐ</h2>
					</div>

					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2">Chọn phương thức thanh toán:</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							{['credit_card', 'paypal', 'bank_transfer'].map(method => (
								<label
									key={method}
									className="flex items-center space-x-2 cursor-pointer bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors"
								>
									<input
										type="radio"
										name="payment"
										value={method}
										onChange={() => setPaymentMethod(method)}
										className="form-radio text-blue-500"
									/>
									<span>{method}</span>
								</label>
							))}

							{wallet?.balance >= totalPrice ? (
								<label className="flex items-center space-x-2 cursor-pointer bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors">
									<input
										type="radio"
										name="payment"
										value="wallet"
										onChange={() => setPaymentMethod('wallet')}
										className="form-radio text-blue-500"
									/>
									<span>{`Ví (${wallet.balance.toLocaleString()}đ)`}</span>
								</label>
							) : (
								<div className="bg-red-500/20 text-red-400 px-4 py-3 rounded-lg">
									Số dư ví hiện tại ({wallet?.balance?.toLocaleString() || 0}đ) không đủ để thanh
									toán.
								</div>
							)}
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-4">
						<button
							onClick={handlePayment}
							className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all"
						>
							Xác Nhận Thanh Toán
						</button>

						<button
							onClick={() => navigate('/')}
							className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-all"
						>
							Trở về Trang Chủ
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Checkout
