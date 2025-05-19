import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cinemas from '../../data/cinemas'
import { useDispatch, useSelector } from 'react-redux'
import { getTheaters, selectTheaters } from '../../redux/Slices/Theater/theaterSlice'
import { getNowShowingMoviesByTheaterGroupedAsync } from '../../redux/Slices/Movie/movieSlice'
import movies from '../../data/movies'

const Showtimes = () => {
	const [selectedDate, setSelectedDate] = useState(null)
	const [selectedMovie, setSelectedMovie] = useState(null)
	const [Movies, setMovies] = useState(null)
	const [selectedCinema, setSelectedCinema] = useState(null)
	const [filteredMovies, setFilteredMovies] = useState('')
	const navigate = useNavigate()

	const dispatch = useDispatch()
	const allTheaters = useSelector(selectTheaters)

	useEffect(() => {
		dispatch(getTheaters({}))
	}, [dispatch])

	function mergeFullMovieInfoById(data) {
		const movieMap = {}

		for (const { show_date, movies } of data) {
			for (const movie of movies) {
				if (!movieMap[movie.movie_id]) {
					// Tạo bản sao movie với set showtimes và show_dates để tránh trùng lặp
					movieMap[movie.movie_id] = {
						...movie,
						showtimes: new Set(movie.showtimes),
						show_dates: new Set([show_date]),
					}
				} else {
					const existing = movieMap[movie.movie_id]

					// Gộp showtimes và show_dates
					for (const time of movie.showtimes) {
						existing.showtimes.add(time)
					}
					existing.show_dates.add(show_date)
				}
			}
		}

		// Convert Set về mảng và sắp xếp
		return Object.values(movieMap).map(movie => ({
			...movie,
			showtimes: Array.from(movie.showtimes).sort(),
			show_dates: Array.from(movie.show_dates).sort(),
		}))
	}

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
				dispatch(getNowShowingMoviesByTheaterGroupedAsync(selectedCinema.theater_id)).then(
					result => {
						console.log(result.payload)
						setMovies(mergeFullMovieInfoById(result.payload))
					}
				)
			}
		}

		setFilteredMovies(filtered)
	}, [selectedDate, selectedMovie, selectedCinema, dispatch])

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

		// if (selectedDate) {
		// 	// Nếu đã chọn ngày, chỉ hiển thị suất chiếu của ngày đó
		// 	const times = movie.showtimes[selectedDate] || []
		// 	return (
		// 		<div>
		// 			<h4 className="font-semibold mb-2 text-white">{selectedDate}</h4>
		// 			<div className="flex flex-wrap gap-2">
		// 				{times.map((time, index) => (
		// 					<button
		// 						key={index}
		// 						className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
		// 						onClick={() => handleShowtimeClick(movie, selectedDate, time)}
		// 					>
		// 						{time}
		// 					</button>
		// 				))}
		// 			</div>
		// 		</div>
		// 	)
		// }

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
	console.log(Movies)
	return (
		<div className="container mx-auto px-4 py-8">
			{/* Thanh filter */}
			<div className="mb-8 bg-[#6B2A4A] p-6 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-4 text-white">Tìm kiếm lịch chiếu</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium text-white mb-2">Chọn rạp</label>
						<select
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
							value={selectedCinema?.theater_id || ''}
							onChange={e => {
								const selected = allTheaters.find(theater => theater.theater_id === e.target.value)
								setSelectedCinema(selected || null)
							}}
						>
							<option value="">Tất cả rạp</option>
							{allTheaters.map(cinema => (
								<option key={cinema.theater_id} value={cinema.theater_id}>
									{cinema.name}
								</option>
							))}
						</select>
					</div>
					{/* <div> */}
					{/* <label className="block text-sm font-medium text-white mb-2">Chọn phim</label>
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
					</div> */}
					{/* <div>
						<label className="block text-sm font-medium text-white mb-2">Chọn ngày</label> */}
					{/* <select
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
						</select> */}
					{/* </div> */}
				</div>
			</div>

			{/* Phần hiển thị phim và suất chiếu */}
			<div className="space-y-8">
				{Movies?.map(movie => {
					const genre = movie.Genres?.map(g => g.genre_name).join(', ') || 'Không xác định'
					const duration = movie.duration ? `${movie.duration} phút` : 'Đang cập nhật'
					const director = movie.director || 'Đang cập nhật'
					const actors = movie.Actors?.map(a => a.name).join(', ') || 'Đang cập nhật'
					const releaseDate = movie.release_date
						? new Date(movie.release_date).toLocaleDateString('vi-VN')
						: 'Đang cập nhật'
					const rating = movie.rating ?? 'Chưa có'

					const renderShowtimes = () => {
						if (!movie.show_dates?.length || !movie.showtimes?.length) return null
						return movie.show_dates.map((date, idx) => (
							<div key={idx}>
								<p className="text-yellow-400 font-semibold mb-1 text-base">
									Ngày: {new Date(date).toLocaleDateString('vi-VN')}
								</p>
								<div className="flex flex-wrap gap-2">
									{movie.showtimes.map((time, i) => (
										<Link
											to={`/booking/${movie.movie_id}`}
											key={i}
											className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm font-medium"
										>
											{time}
										</Link>
									))}
								</div>
							</div>
						))
					}

					return (
						<div key={movie.movie_id} className="bg-bgColor rounded-lg shadow-lg overflow-hidden">
							<div className="flex flex-col md:flex-row">
								<div className="md:w-[180px] w-full">
									<img
										src={movie.poster_url}
										alt={movie.title}
										className="w-full aspect-[2/3] object-cover rounded-t-md md:rounded-l-md md:rounded-tr-none"
									/>
								</div>
								<div className="p-6 md:flex-1">
									<div className="flex flex-col md:flex-row md:gap-6">
										<div className="md:flex-1 mb-4 md:mb-0">
											<h3 className="text-2xl font-bold mb-2 text-white">{movie.title}</h3>
											<div className="space-y-1 text-base text-gray-300">
												<p>
													<span className="font-semibold">Thể loại:</span> {genre}
												</p>
												<p>
													<span className="font-semibold">Thời lượng:</span> {duration}
												</p>
												<p>
													<span className="font-semibold">Đạo diễn:</span> {director}
												</p>
												<p>
													<span className="font-semibold">Diễn viên:</span> {actors}
												</p>
												<p>
													<span className="font-semibold">Khởi chiếu:</span> {releaseDate}
												</p>
												<p>
													<span className="font-semibold">Đánh giá:</span> {rating}
												</p>
											</div>
										</div>
										<div className="md:flex-1">
											<p className="text-base text-gray-300 mb-4">{movie.description}</p>
											<div className="space-y-4">{renderShowtimes()}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Showtimes
