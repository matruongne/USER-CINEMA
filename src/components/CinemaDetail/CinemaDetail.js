import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import cinemas from '../../data/cinemas'
import { MapPin, Clock, Car, Star, Info, Map, Bus, Camera, Gift } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { getTheaterById, selectSelectedTheater } from '../../redux/Slices/Theater/theaterSlice'
import { getNowShowingMoviesByTheaterGroupedAsync } from '../../redux/Slices/Movie/movieSlice'
import { getPromotions, selectPromotions } from '../../redux/Slices/Promotion/promotionSlice'

const CinemaDetail = () => {
	const { slug } = useParams()
	const cinema = cinemas[0]
	const [selectedDate, setSelectedDate] = useState('')
	const [activeTab, setActiveTab] = useState('info')
	const [dates, setDates] = useState([])
	const parts = slug.split('-')
	const theaterId = parts[parts.length - 1]

	const dispatch = useDispatch()
	const theater = useSelector(selectSelectedTheater)

	const selectedDateMovies = dates?.find(date => date.show_date === selectedDate)?.movies || []

	useEffect(() => {
		if (!theaterId) return
		dispatch(getTheaterById(theaterId))
		dispatch(getNowShowingMoviesByTheaterGroupedAsync(theaterId)).then(result => {
			setDates(result.payload)
		})
	}, [theaterId, dispatch])

	const promotions = useSelector(selectPromotions)

	useEffect(() => {
		dispatch(getPromotions({}))
	}, [dispatch])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])

	// validate ID
	if (!/^[0-9a-f]{24}$/.test(theaterId)) {
		return <Navigate to="/not-found" replace />
	}

	if (!theater) {
		return (
			<div className="container mx-auto py-6 px-4">
				<div className="bg-gray-800 rounded-lg p-8 text-center">
					<h2 className="text-2xl font-bold text-white mb-4">Không tìm thấy rạp chiếu phim</h2>
					<p className="text-gray-400 mb-6">
						Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang chủ
					</p>
					<Link
						to="/"
						className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
					>
						Quay lại trang chủ
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="container mx-auto py-6 px-4">
			{/* Thông tin rạp */}
			<div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
				<div className="flex flex-col md:flex-row gap-6">
					<div className="w-full md:w-2/3">
						<h1 className="text-2xl font-bold mb-4 text-white">{theater.name}</h1>
						<div className="space-y-4">
							<div className="flex items-start gap-2">
								<MapPin className="text-yellow-400 mt-1" />
								<div>
									<h2 className="text-lg font-semibold text-yellow-400">Địa chỉ</h2>
									<p className="text-gray-300">{theater?.Addresses[0]?.formatted}</p>
								</div>
							</div>
							<div className="flex items-start gap-2">
								<Clock className="text-yellow-400 mt-1" />
								<div>
									<h2 className="text-lg font-semibold text-yellow-400">Giờ mở cửa</h2>
									<p className="text-gray-300">{cinema.openingHours}</p>
								</div>
							</div>
							<div className="flex items-start gap-2">
								<Car className="text-yellow-400 mt-1" />
								<div>
									<h2 className="text-lg font-semibold text-yellow-400">Bãi đỗ xe</h2>
									<p className="text-gray-300">{cinema.parking}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tiện ích */}
				<div className="mt-8">
					<h2 className="text-xl font-bold mb-4 text-white">Tiện ích</h2>
					<div className="flex flex-wrap gap-2">
						{cinema.facilities.map((facility, index) => (
							<span
								key={index}
								className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold"
							>
								{facility}
							</span>
						))}
					</div>
				</div>

				{/* Mô tả */}
				<div className="mt-8">
					<h2 className="text-xl font-bold mb-4 text-white">Giới thiệu</h2>
					<p className="text-gray-300">{cinema.description}</p>
				</div>
			</div>

			{/* Tabs */}
			<div className="mb-8">
				<div className="flex border-b border-gray-700">
					<button
						className={`px-6 py-3 text-lg font-semibold ${
							activeTab === 'info'
								? 'border-b-2 border-yellow-400 text-yellow-400'
								: 'text-gray-400 hover:text-white'
						}`}
						onClick={() => setActiveTab('info')}
					>
						<Info className="inline-block mr-2" size={18} />
						Thông tin
					</button>
					<button
						className={`px-6 py-3 text-lg font-semibold ${
							activeTab === 'movies'
								? 'border-b-2 border-yellow-400 text-yellow-400'
								: 'text-gray-400 hover:text-white'
						}`}
						onClick={() => setActiveTab('movies')}
					>
						<Camera className="inline-block mr-2" size={18} />
						Phim đang chiếu
					</button>
					<button
						className={`px-6 py-3 text-lg font-semibold ${
							activeTab === 'promotions'
								? 'border-b-2 border-yellow-400 text-yellow-400'
								: 'text-gray-400 hover:text-white'
						}`}
						onClick={() => setActiveTab('promotions')}
					>
						<Gift className="inline-block mr-2" size={18} />
						Khuyến mãi
					</button>
				</div>
			</div>

			{/* Tab Content */}
			{activeTab === 'info' && (
				<div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
					{/* Đặc điểm nổi bật */}
					{cinema.specialFeatures && (
						<div className="mb-8">
							<h2 className="text-xl font-bold mb-4 text-white">Đặc điểm nổi bật</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{cinema.specialFeatures?.map((feature, index) => (
									<div key={index} className="flex items-start gap-2">
										<Star className="text-yellow-400 mt-1" size={18} />
										<p className="text-gray-300">{feature}</p>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Địa điểm gần đó */}
					{cinema.nearbyAttractions && (
						<div className="mb-8">
							<h2 className="text-xl font-bold mb-4 text-white">Địa điểm gần đó</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{cinema.nearbyAttractions.map((attraction, index) => (
									<div key={index} className="flex items-start gap-2">
										<Map className="text-yellow-400 mt-1" size={18} />
										<p className="text-gray-300">{attraction}</p>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Phương tiện di chuyển */}
					{cinema.transportation && (
						<div className="mb-8">
							<h2 className="text-xl font-bold mb-4 text-white">Phương tiện di chuyển</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{cinema.transportation.map((transport, index) => (
									<div key={index} className="flex items-start gap-2">
										<Bus className="text-yellow-400 mt-1" size={18} />
										<p className="text-gray-300">{transport}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}

			{activeTab === 'movies' && (
				<div>
					{/* Chọn ngày */}
					<div className="mb-8">
						<h2 className="text-xl font-bold mb-4 text-black">Chọn ngày</h2>
						<div className="flex gap-4 overflow-x-auto pb-2">
							{dates?.map(date => (
								<button
									key={date.show_date}
									className={`px-4 py-2 rounded-lg font-semibold transition ${
										selectedDate === date.show_date
											? 'bg-yellow-400 text-black'
											: 'bg-gray-700 text-white hover:bg-gray-600'
									}`}
									onClick={() => setSelectedDate(date.show_date)}
								>
									{date.show_date}
								</button>
							))}
						</div>
					</div>

					{/* Danh sách phim */}
					{selectedDateMovies?.length > 0 ? (
						<div className="mb-8">
							<h2 className="text-xl font-bold mb-4 text-black">Lịch chiếu phim</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{selectedDateMovies?.map(movie => (
									<div
										key={movie.movie_id}
										className="bg-gray-800 p-4 rounded-lg shadow-lg flex hover:shadow-xl transition-shadow"
									>
										<img
											src={movie.poster_url}
											alt={movie.title}
											className="w-32 h-48 object-cover rounded-md"
										/>
										<div className="ml-4">
											<h3 className="text-xl font-bold text-white">{movie.title}</h3>
											<p className="text-gray-400 text-sm mt-1">
												Thời lượng: {movie.duration || 'N/A'} phút
											</p>
											<p className="text-gray-400 text-sm">Rating: {movie.rating || 'Chưa có'}</p>

											<div className="mt-2 flex gap-2 flex-wrap">
												{movie?.showtimes?.map(showtime => (
													<Link
														to={`/booking/${movie.movie_id}`}
														className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded-md hover:bg-yellow-500 transition"
													>
														{showtime}
													</Link>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<p className="text-red-500 font-medium">Không có phim nào cho ngày này.</p>
					)}
				</div>
			)}

			{activeTab === 'promotions' && (
				<div className="mb-8">
					<h2 className="text-xl font-bold mb-4 text-black">Khuyến mãi</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{promotions?.length > 0 ? (
							promotions?.map(promo => (
								<Link
									to={`/promotion/${promo.promotion_id}`}
									key={promo.promotion_id}
									className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow block"
								>
									<img
										src={promo.image_url}
										alt={promo.title}
										className="w-full h-40 object-cover rounded-md mb-4"
									/>
									<h3 className="text-lg font-bold text-white">{promo.title}</h3>
									<p className="text-gray-400 text-sm mt-1 line-clamp-2">{promo.description}</p>
								</Link>
							))
						) : (
							<p className="text-gray-300">Không có chương trình khuyến mãi nào hiện tại.</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default CinemaDetail
