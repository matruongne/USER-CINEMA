import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import movies from '../../data/movies'
import cinemas from '../../data/cinemas'

const Showtimes = () => {
	const [selectedDate, setSelectedDate] = useState(null)
	const [selectedMovie, setSelectedMovie] = useState(null)
	const [selectedCinema, setSelectedCinema] = useState(null)
	const [filteredMovies, setFilteredMovies] = useState(movies)
	const navigate = useNavigate()

	// Lấy danh sách ngày chiếu từ dữ liệu phim
	const dates = Object.keys(movies[0].showtimes)

	// Hàm lọc phim
	useEffect(() => {
		let filtered = [...movies]

		// Lọc theo phim (ưu tiên cao nhất)
		if (selectedMovie) {
			filtered = [selectedMovie]
		} else {
			// Lọc theo ngày
			if (selectedDate) {
				filtered = filtered.filter(movie => movie.showtimes[selectedDate]?.length > 0)
			}

			// Lọc theo rạp
			if (selectedCinema) {
				filtered = filtered.filter(movie => movie.cinemas.includes(selectedCinema.id))
			}
		}

		setFilteredMovies(filtered)
	}, [selectedDate, selectedMovie, selectedCinema])

	// Hàm xử lý khi click vào suất chiếu
	const handleShowtimeClick = (movie, date, time) => {
		try {
			if (!movie || !date || !time) {
				console.error('Missing required booking information')
				return
			}

			console.log('Movie info:', {
				id: movie.id,
				title: movie.title,
				date: date,
				time: time,
			})

			if (!movie.id) {
				console.error('Movie ID is missing')
				return
			}

			// Lưu thông tin đặt vé vào localStorage
			const bookingInfo = {
				movieId: movie.id,
				movieTitle: movie.title,
				movieImage: movie.image,
				cinemaId: selectedCinema?.id || movie.cinemas[0],
				cinemaName: selectedCinema?.name || cinemas.find(c => c.id === movie.cinemas[0])?.name,
				showDate: date,
				showTime: time,
				price: movie.price || 85000,
			}

			// Lưu vào localStorage
			localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo))

			// Chuyển hướng đến trang booking với id phim
			const movieId = movie.id.toString()
			console.log('Navigating to:', `/booking/${movieId}`)
			navigate(`/booking/${movieId}`)
		} catch (error) {
			console.error('Error handling showtime click:', error)
		}
	}

	// Hàm hiển thị suất chiếu
	const renderShowtimes = movie => {
		if (!movie || !movie.showtimes) {
			console.error('Invalid movie data:', movie)
			return null
		}

		// console.log("Rendering showtimes for movie:", {
		//   id: movie.id,
		//   title: movie.title,
		// });

		if (selectedDate) {
			// Nếu đã chọn ngày, chỉ hiển thị suất chiếu của ngày đó
			const times = movie.showtimes[selectedDate] || []
			return (
				<div>
					<h4 className="font-semibold mb-2 text-white">{selectedDate}</h4>
					<div className="flex flex-wrap gap-2">
						{times.map((time, index) => (
							<button
								key={index}
								className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
								onClick={() => handleShowtimeClick(movie, selectedDate, time)}
							>
								{time}
							</button>
						))}
					</div>
				</div>
			)
		}

		// Nếu chưa chọn ngày, hiển thị tất cả suất chiếu
		return Object.entries(movie.showtimes).map(([date, times]) => (
			<div key={date} className="mb-4">
				<h4 className="font-semibold mb-2 text-white">{date}</h4>
				<div className="flex flex-wrap gap-2">
					{times.map((time, index) => (
						<button
							key={index}
							className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
							onClick={() => handleShowtimeClick(movie, date, time)}
						>
							{time}
						</button>
					))}
				</div>
			</div>
		))
	}

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Thanh filter */}
			<div className="mb-8 bg-[#6B2A4A] p-6 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-4 text-white">Tìm kiếm lịch chiếu</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium text-white mb-2">Chọn ngày</label>
						<select
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
							value={selectedDate || ''}
							onChange={e => setSelectedDate(e.target.value || null)}
						>
							<option value="">Tất cả ngày</option>
							{dates.map(date => (
								<option key={date} value={date}>
									{date}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-white mb-2">Chọn phim</label>
						<select
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
							value={selectedMovie?.id || ''}
							onChange={e => {
								const movie = movies.find(m => m.id === e.target.value)
								setSelectedMovie(movie || null)
							}}
						>
							<option value="">Tất cả phim</option>
							{movies.map(movie => (
								<option key={movie.id} value={movie.id}>
									{movie.title}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-white mb-2">Chọn rạp</label>
						<select
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
							value={selectedCinema?.id || ''}
							onChange={e => {
								const cinema = cinemas.find(c => c.id === e.target.value)
								setSelectedCinema(cinema || null)
							}}
						>
							<option value="">Tất cả rạp</option>
							{cinemas.map(cinema => (
								<option key={cinema.id} value={cinema.id}>
									{cinema.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{/* Phần hiển thị phim và suất chiếu */}
			<div className="space-y-8">
				{filteredMovies.map(movie => (
					<div key={movie.id} className="bg-bgColor rounded-lg shadow-lg overflow-hidden">
						<div className="flex flex-col md:flex-row">
							<div className="md:w-1/4">
								<img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
							</div>
							<div className="p-6 md:w-3/4">
								<div className="flex flex-col md:flex-row md:items-start md:justify-between">
									<div className="mb-4 md:mb-0">
										<h3 className="text-xl font-bold mb-2 text-white">{movie.title}</h3>
										<div className="space-y-1 text-sm text-gray-300">
											<p>
												<span className="font-semibold">Thể loại:</span> {movie.genre}
											</p>
											<p>
												<span className="font-semibold">Thời lượng:</span> {movie.duration}
											</p>
											<p>
												<span className="font-semibold">Đạo diễn:</span> {movie.director}
											</p>
											<p>
												<span className="font-semibold">Diễn viên:</span> {movie.actors}
											</p>
											<p>
												<span className="font-semibold">Khởi chiếu:</span> {movie.releaseDate}
											</p>
											<p>
												<span className="font-semibold">Đánh giá:</span> {movie.rating}
											</p>
										</div>
									</div>
									<div className="md:ml-8">
										<p className="text-sm text-gray-300 mb-4">{movie.description}</p>
										<div className="space-y-4">{renderShowtimes(movie)}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Showtimes
