import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import movies from '../../data/movies'
import { getTheaters, selectTheaters } from '../../redux/Slices/Theater/theaterSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
	getNowShowingMoviesByTheaterAsync,
	selectNowShowingMovies,
} from '../../redux/Slices/Movie/movieSlice'
import { getAllShowDatesByMovie, selectShowDates } from '../../redux/Slices/Showtime/showtimeSlice'

const QuickBooking = () => {
	const navigate = useNavigate()
	const [selectedCinema, setSelectedCinema] = useState('')
	const [selectedMovie, setSelectedMovie] = useState('')
	const [selectedDate, setSelectedDate] = useState('')
	const [selectedTime, setSelectedTime] = useState('')
	const [availableMovies, setAvailableMovies] = useState([])
	const [availableDates, setAvailableDates] = useState([])
	const [availableTimes, setAvailableTimes] = useState([])
	const dispatch = useDispatch()
	const allTheaters = useSelector(selectTheaters)
	const nowShowingMovies = useSelector(selectNowShowingMovies)
	const showDates = useSelector(selectShowDates)

	useEffect(() => {
		dispatch(getTheaters({}))
		// dispatch(
		// 	getScreens({
		// 		theaterId,
		// 	})
		// )
		// dispatch(getShowtimesByScreen(screenId))
	}, [dispatch])

	useEffect(() => {
		if (selectedCinema) {
			dispatch(getNowShowingMoviesByTheaterAsync(selectedCinema.theater_id))

			setSelectedMovie('')
			setSelectedDate('')
			setSelectedTime('')
		}
	}, [selectedCinema, dispatch])

	useEffect(() => {
		// Cập nhật danh sách phim đang chiếu
		setAvailableMovies(nowShowingMovies)
	}, [nowShowingMovies])

	// Lấy danh sách ngày chiếu khi chọn phim
	useEffect(() => {
		if (selectedMovie) {
			dispatch(getAllShowDatesByMovie(selectedMovie.movie_id))

			setSelectedDate('')
			setSelectedTime('')
		}
	}, [dispatch, selectedMovie])

	useEffect(() => {
		setAvailableDates(showDates)
	}, [showDates])

	// Lấy danh sách suất chiếu khi chọn ngày
	useEffect(() => {
		if (selectedMovie && selectedDate) {
			const movie = movies.find(m => m.title === selectedMovie)
			if (movie && movie.showtimes[selectedDate]) {
				setAvailableTimes(movie.showtimes[selectedDate])
				setSelectedTime('')
			}
		}
	}, [selectedMovie, selectedDate])

	const handleBooking = () => {
		if (selectedMovie) {
			navigate(`/booking/${selectedMovie.movie_id}`, {
				state: {
					selectedCinema,
					selectedDate,
					selectedTime,
				},
			})
		}
	}

	return (
		<div className="bg-secondary py-4 px-6 rounded-lg w-[90%] mx-auto mt-6 shadow-md">
			<h2 className="text-white text-2xl font-bold mb-4">ĐẶT VÉ NHANH</h2>
			<div className="grid grid-cols-5 gap-2 items-center">
				<select
					className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
					value={selectedCinema?.theater_id || ''}
					onChange={e => {
						const selected = allTheaters.find(theater => theater.theater_id === e.target.value)
						setSelectedCinema(selected || null)
					}}
				>
					<option value="" selected disabled>
						1. Chọn Rạp
					</option>
					{allTheaters.map(cinema => (
						<option key={cinema.theater_id} value={cinema.theater_id}>
							{cinema.name}
						</option>
					))}
				</select>

				<select
					className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
					value={selectedMovie.movie_id}
					onChange={e => {
						const selected = availableMovies.find(movie => movie.movie_id === e.target.value)
						setSelectedMovie(selected || null)
					}}
					disabled={!selectedCinema}
				>
					<option value="" selected disabled>
						2. Chọn Phim
					</option>
					{availableMovies.map(movie => (
						<option key={movie.movie_id} value={movie.movie_id}>
							{movie.title}
						</option>
					))}
				</select>

				{/* Chọn Ngày */}
				<select
					className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
					value={selectedDate.show_date_id}
					onChange={e => {
						const selected = availableDates.find(date => date.show_date_id === e.target.value)
						setSelectedDate(selected || null)
					}}
					disabled={!selectedMovie}
				>
					<option value="" selected disabled>
						3. Chọn Ngày
					</option>
					{availableDates.map(date => (
						<option key={date.show_date_id} value={date.show_date_id}>
							{date.show_date}
						</option>
					))}
				</select>

				{/* Chọn Suất */}
				<select
					className="p-3 rounded-md text-lg border-2 border-[#6A1B9A] bg-white text-black"
					value={selectedTime.showtime_id}
					onChange={e => {
						const selected = selectedDate?.Showtimes?.find(
							time => time.showtime_id === e.target.value
						)
						setSelectedTime(selected || null)
					}}
					disabled={!selectedDate}
				>
					<option value="" selected disabled>
						4. Chọn Suất
					</option>
					{selectedDate?.Showtimes?.map(time => (
						<option key={time.showtime_id} value={time.showtime_id}>
							{time.show_time}
						</option>
					))}
				</select>

				{/* Nút Đặt Vé */}
				<button
					className="bg-primary text-white font-bold py-3 rounded-md text-lg w-full transition-all duration-300 hover:bg-primary/60 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={handleBooking}
					disabled={!selectedCinema || !selectedMovie || !selectedDate || !selectedTime}
				>
					ĐẶT NGAY
				</button>
			</div>
		</div>
	)
}

export default QuickBooking
