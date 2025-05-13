import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import './food.css'
import { toast } from 'react-toastify'
import SeatLayout from '../components/SeatLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieByIdAsync } from '../redux/Slices/Movie/movieSlice'
import { FaClock, FaLanguage, FaCalendarAlt, FaBuilding, FaTags, FaUsers } from 'react-icons/fa'
import { FaUserTie } from 'react-icons/fa6'
import {
	getAllShowDatesByMovie,
	selectShowDates,
	selectShowtimes,
} from '../redux/Slices/Showtime/showtimeSlice'
import { FiCalendar } from 'react-icons/fi'
import {
	getTheatersByShowtimeIds,
	selectTheatersByShowtimeId,
} from '../redux/Slices/Theater/theaterSlice'
import isEqual from 'lodash/isEqual'
import { getSeatsByScreen, selectSeats } from './../redux/Slices/Seat/seatSlice'
import { holdSeats, removeHoldSeat } from '../redux/Slices/Booking/bookingSlice'
import BookingComponent from '../components/BookingComponent'

const BookingDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState(false)
	const [selectedLayout, setSelectedLayout] = useState('bowshape')

	const [selectedCinema, setSelectedCinema] = useState('')
	const [cart, setCart] = useState([])
	const [selectedDate, setSelectedDate] = useState(null)
	const [selectedTime, setSelectedTime] = useState(null)
	const [selectedSeats, setSelectedSeats] = useState([])
	const [showSeatSelection, setShowSeatSelection] = useState()
	const [showDetails, setShowDetails] = useState(false)
	const [removedSeatIds, setRemovedSeatIds] = useState([])

	const stickyBarRef = useRef(null)
	const footerRef = useRef(null)

	// Scroll to top khi component mount
	useEffect(() => {
		setIsLoading(true)

		window.scrollTo(0, 0)
	}, [])

	const dispatch = useDispatch()
	const selectedMovie = useSelector(state => state.movie.selectedMovie)
	const isMovieLoading = useSelector(state => state.movie.loading)

	const selectedShowDates = useSelector(selectShowDates)
	const cinemas = useSelector(selectTheatersByShowtimeId)
	const seats = useSelector(selectSeats)

	const now = new Date()
	now.setSeconds(0, 0)
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	const isNotReleased =
		selectedMovie && selectedMovie.release_date > today.toISOString().split('T')[0]

	const sortedShowDates = [...selectedShowDates]
		.filter(dateObj => {
			const showDate = new Date(dateObj.show_date)
			showDate.setHours(0, 0, 0, 0)

			// Nếu ngày chiếu < hôm nay → loại
			if (showDate < today) return false

			// Nếu ngày chiếu > hôm nay → giữ lại nếu có showtimes
			if (showDate > today) return dateObj.Showtimes?.length > 0

			// Nếu ngày chiếu === hôm nay → kiểm tra giờ chiếu
			return dateObj.Showtimes?.some(showtime => {
				const [hour, minute, second] = showtime.show_time.split(':').map(Number)
				const showtimeDate = new Date(dateObj.show_date)
				showtimeDate.setHours(hour, minute, second || 0, 0)
				return showtimeDate > now
			})
		})
		.sort((a, b) => new Date(a.show_date) - new Date(b.show_date))

	const selectedShowDateObj = sortedShowDates.find(
		d => new Date(d.show_date).toDateString() === selectedDate?.toDateString()
	)
	const filteredShowtimes = useMemo(() => {
		if (!selectedDate) return []

		return (
			selectedShowDateObj?.Showtimes?.filter(time => {
				const showtimeDate = new Date(
					`${selectedDate.toISOString().split('T')[0]}T${time.show_time}`
				)

				if (selectedDate.toDateString() === now.toDateString()) {
					return showtimeDate > now
				}
				return true
			}) ?? []
		)
	}, [selectedDate, selectedShowDateObj?.Showtimes, now])

	const prevIdsRef = useRef([])

	useEffect(() => {
		const newIds = filteredShowtimes?.map(t => t.showtime_id).filter(Boolean) ?? []

		if (newIds.length > 0 && !isEqual(prevIdsRef.current, newIds)) {
			prevIdsRef.current = newIds
			dispatch(getTheatersByShowtimeIds(newIds))
		}
	}, [filteredShowtimes, dispatch])

	useEffect(() => {
		if (id) {
			dispatch(getMovieByIdAsync(id))
			dispatch(getAllShowDatesByMovie(id)).finally(() => setIsLoading(false))
		}
	}, [dispatch, id])

	useEffect(() => {
		const handleScroll = () => {
			if (footerRef.current && stickyBarRef.current) {
				const footerRect = footerRef.current.getBoundingClientRect()
				const stickyBar = stickyBarRef.current

				if (footerRect.top > window.innerHeight) {
					stickyBar.style.position = 'fixed'
					stickyBar.style.bottom = '0'
				} else {
					stickyBar.style.position = 'absolute'
					stickyBar.style.bottom = `${footerRef.current.offsetHeight}px`
				}
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const [seatLayout, setSeatLayout] = useState({ rows: [], cols: 0, coupleSeats: [], booked: [] })

	useEffect(() => {
		if (seats.length > 0) {
			const layout = generateSeatLayout(seats)
			setSeatLayout(layout)
		}
	}, [seats])

	const generateSeatLayout = seats => {
		const rowsSet = new Set()
		let maxCol = 0
		const coupleSeats = new Set()
		const booked = []
		const rowCols = {}
		const held = []

		seats.forEach(seat => {
			const row = seat.seat_row
			const col = parseInt(seat.seat_number)

			rowsSet.add(row)
			if (col > maxCol) maxCol = col

			if (!rowCols[row]) {
				rowCols[row] = 1
			} else {
				rowCols[row] = maxCol
			}

			if (seat.seat_type === 'DUPLEX') coupleSeats.add(row)
			if (seat.booking_id) booked.push(`${row}${String(seat?.seat_number).padStart(2, '0')}`)
			if (seat.status === 'held') held.push(`${row}${String(seat?.seat_number).padStart(2, '0')}`)
		})

		const coupleRowCols = {}
		Array.from(coupleSeats).forEach(row => {
			coupleRowCols[row] = rowCols[row] || 0
		})
		return {
			rows: Array.from(rowsSet).sort(),
			cols: maxCol,
			rowCols,
			coupleSeats: Array.from(coupleSeats).sort(),
			coupleRowCols,
			booked,
			held,
		}
	}

	const handleSeatClick = (seatId, seatNumber, row) => {
		const seatCode = `${row}${seatNumber.toString().padStart(2, '0')}`

		if (seatLayout.booked.includes(seatCode)) return
		console.log(seatLayout.coupleSeats)
		// Ghế đôi
		// if (seatLayout.coupleSeats.includes(seatCode)) {
		// 	const pairNumber = seatNumber % 2 === 0 ? seatNumber - 1 : seatNumber + 1
		// 	const pairSeatCode = `${row}${pairNumber.toString().padStart(2, '0')}`

		// 	const pairSeat = seats?.items?.find(s => s.seat_row === row && s.seat_number === pairNumber)
		// 	console.log(pairNumber, pairSeatCode, pairSeat)
		// 	if (!pairSeat) return

		// 	const isBothSelected =
		// 		selectedSeats.some(s => s.seat_code === seatCode) &&
		// 		selectedSeats.some(s => s.seat_code === pairSeatCode)

		// 	if (isBothSelected) {
		// 		// Bỏ chọn
		// 		const removedIds = [seatId, pairSeat.seat_id]
		// 		setRemovedSeatIds(removedIds)
		// 		setSelectedSeats(prev =>
		// 			prev.filter(s => s.seat_code !== seatCode && s.seat_code !== pairSeatCode)
		// 		)
		// 	} else {
		// 		setRemovedSeatIds([]) // reset
		// 		setSelectedSeats(prev => [
		// 			...prev,
		// 			{ seat_code: seatCode, seat_id: seatId },
		// 			{ seat_code: pairSeatCode, seat_id: pairSeat.seat_id },
		// 		])
		// 	}
		// 	return
		// }
		// Ghế thường
		const isSelected = selectedSeats.some(s => s.seat_code === seatCode)
		if (isSelected) {
			setRemovedSeatIds([seatId]) // để gọi remove hold
			setSelectedSeats(prev => prev.filter(s => s.seat_code !== seatCode))
		} else {
			setRemovedSeatIds([]) // reset
			setSelectedSeats(prev => [...prev, { seat_code: seatCode, seat_id: seatId }])
		}
	}
	const prevSelectedSeatsRef = useRef([])

	// useEffect để theo dõi thay đổi của selectedSeats và gọi dispatch
	useEffect(() => {
		const prevSelectedSeats = prevSelectedSeatsRef.current

		const addedSeats = selectedSeats.filter(
			curr => !prevSelectedSeats.some(prev => prev.seat_id === curr.seat_id)
		)
		const removedSeats = prevSelectedSeats.filter(
			prev => !selectedSeats.some(curr => curr.seat_id === prev.seat_id)
		)

		// Nếu có ghế thêm → hold
		if (addedSeats.length > 0) {
			dispatch(
				holdSeats({
					showtimeId: selectedTime?.showtime_id,
					requestedSeats: 0,
					selectedSeats,
				})
			).then(() => {
				const matchedScreen = selectedCinema?.Screens.find(screen =>
					screen.ScreenShowtimes?.some(s => s.showtime_id === selectedTime?.showtime_id)
				)
				if (matchedScreen) {
					dispatch(
						getSeatsByScreen({
							screenId: matchedScreen.screen_id,
							search: '',
							sort: 'seat_row',
							order: 'ASC',
						})
					)
				}
			})
		}

		// Nếu có ghế bị bỏ → gọi removeHoldSeat từng cái
		if (removedSeats.length > 0 && !isResetting) {
			for (const seat of removedSeats) {
				dispatch(
					removeHoldSeat({
						showtimeId: selectedTime?.showtime_id,
						seatId: seat.seat_id,
					})
				).then(() => {
					const matchedScreen = selectedCinema?.Screens.find(screen =>
						screen.ScreenShowtimes?.some(s => s.showtime_id === selectedTime?.showtime_id)
					)
					if (matchedScreen) {
						dispatch(
							getSeatsByScreen({
								screenId: matchedScreen.screen_id,
								search: '',
								sort: 'seat_row',
								order: 'ASC',
							})
						)
					}
				})
			}
		}

		// Cập nhật lại ref
		prevSelectedSeatsRef.current = selectedSeats
	}, [selectedSeats, dispatch, selectedTime?.showtime_id, selectedCinema?.Screens])
	const handleAddToCart = item => {
		setCart(prevCart => {
			const existingItem = prevCart.find(cartItem => cartItem?.name === item?.name)

			toast(`Đã thêm ${item?.name} vào giỏ hàng`, {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})

			if (existingItem) {
				return prevCart.map(cartItem =>
					cartItem?.name === item?.name
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)
			} else {
				return [...prevCart, { ...item, quantity: 1 }]
			}
		})
	}

	const decreaseQuantity = name => {
		setCart(prevCart =>
			prevCart
				.map(item => (item?.name === name ? { ...item, quantity: item.quantity - 1 } : item))
				.filter(item => item.quantity > 0)
		)
	}

	const removeFromCart = id => {
		setCart(prevCart => prevCart.filter(item => item.id !== id))
	}

	const seatPrice = 75000
	const seatTotal = selectedSeats.length * seatPrice
	const foodTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
	const totalPrice = seatTotal + foodTotal

	const handleCheckout = () => {
		if (!selectedMovie) return alert('Vui lòng chọn phim.')
		if (!selectedDate) return alert('Vui lòng chọn ngày chiếu.')
		if (!selectedCinema) return alert('Vui lòng chọn rạp.')
		if (!selectedTime) return alert('Vui lòng chọn giờ chiếu.')
		if (selectedSeats.length === 0) return alert('Vui lòng chọn ghế.')

		// Chỉ truyền các thông tin cần thiết của phim
		const movieInfo = {
			id: selectedMovie.id,
			title: selectedMovie.title,
			image: selectedMovie.image,
		}

		// Chuyển đổi selectedDate thành string
		const formattedDate = selectedDate.toLocaleDateString('vi-VN', {
			weekday: 'long',
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		})

		navigate('/checkout', {
			state: {
				cart,
				totalPrice,
				selectedSeats,
				selectedMovie: movieInfo,
				selectedTime: selectedTime,
				selectedDate: formattedDate,
				selectedCinema: selectedCinema?.name,
			},
		})
		setCart([])
	}

	const [isResetting, setIsResetting] = useState(false)
	const [pendingDate, setPendingDate] = useState(null)

	const handleDateSelect = date => {
		setIsLoading(true)
		setSelectedTime(null)
		setSelectedCinema(null)
		setShowSeatSelection(false)
		setSelectedDate(null)
		setSelectedSeats([])
		setSeatLayout([])
		setPendingDate(date)
		setIsResetting(true)
	}

	// Sau khi reset xong, mới set selectedDate
	useEffect(() => {
		if (isResetting) {
			setSelectedDate(pendingDate)
			setPendingDate(null)
			setIsResetting(false)
			setIsLoading(false)
		}
	}, [isResetting])

	const handleCinemaSelect = cinema => {
		setIsLoading(true)
		setSelectedCinema(cinema)
		setTimeout(() => setIsLoading(false), 500)
	}

	const handleTimeSelect = (time, cinema) => {
		setIsLoading(true)
		setSelectedTime(time)
		setSelectedCinema(cinema)
		setShowSeatSelection(true)

		const showtimeId = time.showtime_id

		const matchedScreen = cinema.Screens.find(screen =>
			screen.ScreenShowtimes?.some(s => s.showtime_id === showtimeId)
		)

		matchedScreen?.layout && setSelectedLayout(matchedScreen?.layout)

		if (matchedScreen) {
			dispatch(
				getSeatsByScreen({
					screenId: matchedScreen.screen_id,
					search: '',
					sort: 'seat_row',
					order: 'ASC',
				})
			)
		}

		setTimeout(() => setIsLoading(false), 500)
	}

	return (
		<div className="container mx-auto p-6 text-black">
			{selectedMovie && (
				<div className="mb-6 animate-fade-in">
					<div className="flex gap-8">
						<img
							src={selectedMovie.poster_url}
							alt={selectedMovie.title}
							className="w-64 h-96 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
						/>
						<div className="flex-1">
							<h1 className="text-4xl font-bold mb-4">{selectedMovie.title}</h1>
							<div className="grid grid-cols-2 gap-4 mb-4 text-base">
								<p className="flex items-center gap-2">
									<FaClock className="text-blue-600" />
									<strong className="text-lg">Thời lượng:</strong> {selectedMovie.duration} phút
								</p>
								<p className="flex items-center gap-2">
									<FaLanguage className="text-green-600" />
									<strong className="text-lg">Ngôn ngữ:</strong> {selectedMovie.language}
								</p>
								<p className="flex items-center gap-2">
									<FaCalendarAlt className="text-red-600" />
									<strong className="text-lg">Khởi chiếu:</strong>{' '}
									{new Date(selectedMovie.release_date).toLocaleDateString()}
								</p>
								<p className="flex items-center gap-2">
									<FaUserTie className="text-purple-600" />
									<strong className="text-lg">Đạo diễn:</strong>{' '}
									{selectedMovie.director || 'Đang cập nhật'}
								</p>
								<p className="flex items-center gap-2">
									<FaBuilding className="text-yellow-600" />
									<strong className="text-lg">Hãng sản xuất:</strong>{' '}
									{selectedMovie.production_company || 'Đang cập nhật'}
								</p>
								<p className="flex items-center gap-2">
									<FaTags className="text-pink-600" />
									<strong className="text-lg">Thể loại:</strong>{' '}
									{selectedMovie.Genres?.map((g, index) => (
										<a
											key={g.genre_id}
											href={`/search?genre=${g.genre_id}`}
											className="text-blue-600 hover:underline"
										>
											{g.genre_name}
											{index < selectedMovie.Genres.length - 1 ? ', ' : ''}
										</a>
									)) || 'Đang cập nhật'}
								</p>
								<p className="flex items-center gap-2 col-span-2">
									<FaUsers className="text-indigo-600" />
									<strong className="text-lg">Diễn viên:</strong>{' '}
									{selectedMovie.Actors?.map(
										a => `${a?.name} (${a.MovieActor?.role || 'vai phụ'})`
									).join(', ') || 'Đang cập nhật'}
								</p>
							</div>
							<p className="text-lg">{selectedMovie.description}</p>
						</div>
					</div>
				</div>
			)}
			{!isNotReleased ? (
				<div className="mb-8 animate-fade-in">
					{!isLoading && (
						<>
							{!sortedShowDates?.length ? (
								<h2 className="text-4xl text-center font-bold mb-4">Chưa có ngày chiếu</h2>
							) : (
								<>
									<h2 className="text-2xl font-bold mb-4">Chọn ngày chiếu</h2>
									<div className="flex gap-4 flex-wrap">
										{sortedShowDates.map(dateObj => {
											const date = new Date(dateObj.show_date)
											const isSelected = selectedDate?.toDateString() === date.toDateString()

											return (
												<button
													key={dateObj.show_date_id}
													className={`px-6 py-3 text-white rounded-lg text-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
														isSelected ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
													}`}
													onClick={() => handleDateSelect(date)}
												>
													<FiCalendar className="text-xl" />
													{date.toLocaleDateString('vi-VN', {
														weekday: 'long',
														day: 'numeric',
														month: 'numeric',
													})}
												</button>
											)
										})}
									</div>
								</>
							)}
						</>
					)}
				</div>
			) : (
				<div className="mb-8 animate-fade-in">
					{!isLoading && (
						<>
							<h2 className="text-4xl text-center font-bold mb-4">Chưa tới ngày khởi chiếu</h2>
						</>
					)}
				</div>
			)}

			{selectedDate && (
				<div className="mb-8 animate-fade-in">
					<h2 className="text-2xl font-bold mb-4">Chọn rạp</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{cinemas.map(cinema => (
							<div
								key={cinema.theater_id}
								className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
									selectedCinema?.name === cinema?.name
										? 'bg-red-600'
										: 'bg-gray-700 text-white hover:bg-gray-500'
								}`}
								onClick={() => handleCinemaSelect(cinema)}
							>
								<h3 className="text-xl font-bold mb-2">{cinema?.name}</h3>
								<p className="text-sm mb-2">{cinema?.Addresses[0]?.formatted}</p>
								<div className="flex flex-wrap gap-2">
									{filteredShowtimes
										.filter(time =>
											// Kiểm tra nếu bất kỳ screen nào trong cinema có showtime_id trùng
											cinema.Screens.some(screen =>
												screen.ScreenShowtimes?.some(st => st.showtime_id === time.showtime_id)
											)
										)
										?.map(time => (
											<button
												key={time.showtime_id}
												className={`px-3 py-1 rounded transition-all duration-300 hover:scale-105 ${
													selectedTime?.show_time === time.show_time &&
													selectedCinema?.name === cinema?.name
														? 'bg-white text-red-600'
														: 'bg-gray-600 hover:bg-gray-400 text-white'
												}`}
												onClick={e => {
													e.stopPropagation()
													handleTimeSelect(time, cinema)
												}}
											>
												{time.show_time.slice(0, 5)}
											</button>
										))}
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{isLoading && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
				</div>
			)}

			{showSeatSelection && (
				<>
					<SeatLayout
						seatLayout={seatLayout}
						layoutType={selectedLayout}
						selectedSeats={selectedSeats}
						onSeatClick={handleSeatClick}
						seats={seats}
						isLoading={isLoading}
					/>

					{/* <div className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-center text-white">CHỌN BẮP NƯỚC</h2>

						<div className="space-y-8">
							<div>
								<h3 className="text-xl font-bold mb-4 text-center text-yellow-400">COMBO 2 NGÂN</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/combo-gau.jpg"
												alt="Combo gấu"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">COMBO GẤU</h4>
												<p className="text-sm text-gray-400 mb-2">
													1 Bắp + 1 Nước 64oz Phiên Bản Gấu + Caramel
												</p>
												<p className="text-yellow-400 font-bold">199.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('COMBO GẤU')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'COMBO GẤU')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'COMBO GẤU',
																price: 199000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/combo-co-gau.jpg"
												alt="Combo có gấu"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">COMBO CÓ GẤU</h4>
												<p className="text-sm text-gray-400 mb-2">
													1 Bắp + 2 Nước 64oz Phiên Bản Gấu + Caramel
												</p>
												<p className="text-yellow-400 font-bold">259.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('COMBO CÓ GẤU')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'COMBO CÓ GẤU')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'COMBO CÓ GẤU',
																price: 259000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/combo-nha-gau.jpg"
												alt="Combo nhà gấu"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">COMBO NHÀ GẤU</h4>
												<p className="text-sm text-gray-400 mb-2">
													1 Bắp + 3 Nước 64oz Phiên Bản Gấu + Caramel
												</p>
												<p className="text-yellow-400 font-bold">319.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('COMBO NHÀ GẤU')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'COMBO NHÀ GẤU')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'COMBO NHÀ GẤU',
																price: 319000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-bold mb-4 text-center text-yellow-400">NƯỚC NGỌT</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/sprite.jpg"
												alt="Sprite"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">SPRITE 390Z</h4>
												<p className="text-yellow-400 font-bold">37.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('SPRITE 390Z')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'SPRITE 390Z')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'SPRITE 390Z',
																price: 37000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/coke-zero.jpg"
												alt="Coke Zero"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">COKE ZERO 390Z</h4>
												<p className="text-yellow-400 font-bold">37.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('COKE ZERO 390Z')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'COKE ZERO 390Z')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'COKE ZERO 390Z',
																price: 37000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/fanta.jpg"
												alt="Fanta"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">FANTA 390Z</h4>
												<p className="text-yellow-400 font-bold">37.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('FANTA 390Z')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'FANTA 390Z')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'FANTA 390Z',
																price: 37000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-bold mb-4 text-center text-yellow-400">
									NƯỚC ĐÓNG CHAI
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/teppy.jpg"
												alt="Teppy"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">NƯỚC CAM TEPPY</h4>
												<p className="text-yellow-400 font-bold">58.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('NƯỚC CAM TEPPY')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'NƯỚC CAM TEPPY')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'NƯỚC CAM TEPPY',
																price: 58000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/dasani.jpg"
												alt="Dasani"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">NƯỚC SUỐI DASANI 500ML</h4>
												<p className="text-yellow-400 font-bold">30.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('NƯỚC SUỐI DASANI 500ML')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'NƯỚC SUỐI DASANI 500ML')?.quantity ||
															0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'NƯỚC SUỐI DASANI 500ML',
																price: 30000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/nutriboost.jpg"
												alt="Nutriboost"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">
													NƯỚC TRÁI CÂY NUTRIBOOST 297ML
												</h4>
												<p className="text-yellow-400 font-bold">58.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('NƯỚC TRÁI CÂY NUTRIBOOST 297ML')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'NƯỚC TRÁI CÂY NUTRIBOOST 297ML')
															?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'NƯỚC TRÁI CÂY NUTRIBOOST 297ML',
																price: 58000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-bold mb-4 text-center text-yellow-400">SNACKS - KẸO</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/snack-thai.jpg"
												alt="Snack Thái"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">SNACK THÁI</h4>
												<p className="text-yellow-400 font-bold">25.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('SNACK THÁI')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'SNACK THÁI')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'SNACK THÁI',
																price: 25000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/poca-wavy.jpg"
												alt="Poca Wavy"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">POCA WAVY 54GR</h4>
												<p className="text-yellow-400 font-bold">35.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('POCA WAVY 54GR')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'POCA WAVY 54GR')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'POCA WAVY 54GR',
																price: 35000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/lays-stax.jpg"
												alt="Lay's Stax"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">KHOAI TÂY LAY'S STAX 105G</h4>
												<p className="text-yellow-400 font-bold">45.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity("KHOAI TÂY LAY'S STAX 105G")}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === "KHOAI TÂY LAY'S STAX 105G")
															?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: "KHOAI TÂY LAY'S STAX 105G",
																price: 45000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/snack-partyz.jpg"
												alt="Snack Partyz"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">SNACK PARTYZ 55GR</h4>
												<p className="text-yellow-400 font-bold">35.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('SNACK PARTYZ 55GR')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'SNACK PARTYZ 55GR')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'SNACK PARTYZ 55GR',
																price: 35000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-800 p-4 rounded-lg">
										<div className="flex gap-4">
											<img
												src="/images/poca-khoai-tay.jpg"
												alt="Poca Khoai Tây"
												className="w-32 h-32 object-cover rounded-lg"
											/>
											<div>
												<h4 className="font-bold mb-2 text-white">POCA KHOAI TÂY 54GR</h4>
												<p className="text-yellow-400 font-bold">35.000 VNĐ</p>
												<div className="flex items-center gap-2 mt-2">
													<button
														className="bg-gray-700 px-3 py-1 rounded text-white"
														onClick={() => decreaseQuantity('POCA KHOAI TÂY 54GR')}
													>
														-
													</button>
													<span className="text-white">
														{cart.find(item => item?.name === 'POCA KHOAI TÂY 54GR')?.quantity || 0}
													</span>
													<button
														className="bg-red-600 px-3 py-1 rounded text-white"
														onClick={() =>
															handleAddToCart({
																name: 'POCA KHOAI TÂY 54GR',
																price: 35000,
															})
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> */}

					<div
						ref={stickyBarRef}
						className="sticky-bar bg-gradient-to-t from-[#1a1f37] to-transparent pt-8"
					>
						<div className="container mx-auto px-6">
							<div className="bg-gray-800 p-4 rounded-lg">
								<div className="flex items-center justify-between">
									<div className="flex gap-4 text-sm text-gray-400">
										<p>Rạp: {selectedCinema?.name}</p>
										<p>
											Suất: {selectedTime?.show_time} | {selectedDate?.toLocaleDateString('vi-VN')}
										</p>
										<p>Ghế: {selectedSeats.map(s => s.seat_code).join(', ')}</p>
										{cart.length > 0 && (
											<p>Combo: {cart.map(item => `${item?.name} x${item.quantity}`).join(', ')}</p>
										)}
									</div>
									<div className="flex items-center gap-8">
										<div>
											<BookingComponent
												selectedSeats={selectedSeats}
												setSelectedSeats={setSelectedSeats}
											/>
										</div>
										<div>
											<p className="text-gray-400 text-sm">Tổng tiền</p>
											<p className="text-yellow-400 text-xl font-bold">
												{totalPrice.toLocaleString()} VNĐ
											</p>
										</div>
										<button
											onClick={handleCheckout}
											className="bg-yellow-500 px-8 py-3 rounded-lg text-lg font-bold text-gray-900 hover:bg-yellow-600 transition"
										>
											Thanh toán
										</button>
									</div>
								</div>

								{showDetails && (
									<div className="mt-4 pt-4 border-t border-gray-700 animate-fade-in">
										<div className="grid grid-cols-2 gap-6">
											<div>
												<h2 className="text-2xl font-bold text-white mb-4">
													{selectedMovie?.title}
												</h2>
												<p className="text-gray-400 mb-2">{selectedMovie?.description}</p>
											</div>
											<div>
												<div className="space-y-2">
													<p className="text-gray-400">
														Tiền vé:{' '}
														<span className="text-white">{seatTotal.toLocaleString()} VNĐ</span>
													</p>
													{cart.length > 0 && (
														<>
															<p className="text-gray-400">khác :</p>
															<div className="pl-4">
																{cart.map(item => (
																	<p key={item?.name} className="text-white">
																		{item?.name} x{item.quantity} -{' '}
																		{(item.price * item.quantity).toLocaleString()} VNĐ
																	</p>
																))}
															</div>
														</>
													)}
												</div>
											</div>
										</div>
									</div>
								)}

								<div
									className="flex items-center justify-center mt-2 cursor-pointer"
									onClick={() => setShowDetails(!showDetails)}
								>
									<span className="text-blue-400 underline text-sm">
										{showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
									</span>
									<svg
										className={`w-4 h-4 text-blue-400 transform transition-transform ml-1 ${
											showDetails ? 'rotate-180' : ''
										}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>

					<div ref={footerRef} className="mt-32">
						{/* Your footer content */}
					</div>

					<style jsx>{`
						.sticky-bar {
							position: fixed;
							left: 0;
							right: 0;
							bottom: 0;
							z-index: 50;
						}
					`}</style>
				</>
			)}
		</div>
	)
}

export default BookingDetail
