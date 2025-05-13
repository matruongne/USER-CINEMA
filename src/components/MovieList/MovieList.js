// MoviesList.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAsync, selectMovieStatus } from '../../redux/Slices/Movie/movieSlice'
import AOS from 'aos'
import 'aos/dist/aos.css'

const MovieGrid = ({ movies, onClick }) => (
	<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
		{movies.map(movie => (
			<div
				key={movie.movie_id}
				className="relative bg-gray-800 rounded-xl shadow-md overflow-hidden group cursor-pointer"
				onClick={() => onClick(movie)}
			>
				<div className="w-full aspect-[2/3] overflow-hidden">
					<img
						src={movie.poster_url}
						alt={movie.title}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
				<div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
					<h3 className="text-lg font-bold text-yellow-400 mb-2">{movie.title}</h3>
					<p className="text-sm text-white">
						{movie.duration} phút • {movie.release_date}
					</p>
				</div>
			</div>
		))}
	</div>
)

const MoviesList = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const status = useSelector(selectMovieStatus)

	const [nowShowing, setNowShowing] = useState([])
	const [comingSoon, setComingSoon] = useState([])

	const [nowPage, setNowPage] = useState(1)
	const [soonPage, setSoonPage] = useState(1)

	const [nowDone, setNowDone] = useState(false)
	const [soonDone, setSoonDone] = useState(false)

	const today = new Date()

	const handleBooking = movie => {
		navigate(`/booking/${movie.movie_id}`)
	}

	useEffect(() => {
		AOS.init()
	}, [])

	useEffect(() => {
		const fetchNowShowing = async () => {
			let hasMore = true
			let currentPage = nowPage
			let accumulated = [...nowShowing]

			while (hasMore && accumulated.length < nowPage * 4) {
				const { payload } = await dispatch(getAllMoviesAsync({ page: currentPage, limit: 4 }))
				if (!payload || !payload.items.length) {
					hasMore = false
					break
				}

				const filtered = payload.items.filter(m => new Date(m.release_date) <= new Date())

				accumulated = [...accumulated, ...filtered]
				currentPage += 1
			}

			setNowShowing(accumulated)
			if (!hasMore) setNowDone(true)
		}

		fetchNowShowing()
	}, [nowPage, dispatch])

	useEffect(() => {
		const fetchComingSoon = async () => {
			let hasMore = true
			let currentPage = soonPage
			let accumulated = [...comingSoon]

			while (hasMore && accumulated.length < soonPage * 4) {
				const { payload } = await dispatch(getAllMoviesAsync({ page: currentPage, limit: 4 }))
				if (!payload || !payload.items.length) {
					hasMore = false
					break
				}

				const filtered = payload.items.filter(m => new Date(m.release_date) > new Date())

				// ❗ Loại bỏ phim đã nằm trong nowShowing
				const uniqueFiltered = filtered.filter(
					m => !nowShowing.some(n => n.movie_id === m.movie_id)
				)

				if (uniqueFiltered.length === 0) {
					hasMore = false
					break
				}

				accumulated = [...accumulated, ...uniqueFiltered]
				currentPage += 1
			}

			setComingSoon(accumulated)
			if (!hasMore) setSoonDone(true)
		}

		fetchComingSoon()
	}, [soonPage, dispatch])

	return (
		<div className="container mx-auto px-4 py-8">
			<section className="mb-12" data-aos="fade-up">
				<h2 className="text-3xl font-bold text-white ml-[-52px] mb-12">Phim Đang Chiếu</h2>
				<MovieGrid movies={nowShowing} onClick={handleBooking} />
				{!nowDone && (
					<div className="text-center mt-4">
						<button
							onClick={() => setNowPage(p => p + 1)}
							disabled={status === 'loading'}
							className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary/80 disabled:opacity-50"
						>
							{status === 'loading' ? 'Đang tải...' : 'Tải thêm'}
						</button>
					</div>
				)}
			</section>

			<section className="mb-12" data-aos="fade-up">
				<h2 className="text-3xl font-bold text-white ml-[-52px] mt-12 mb-12">Phim Sắp Chiếu</h2>
				<MovieGrid movies={comingSoon} onClick={handleBooking} />
				{!soonDone && (
					<div className="text-center mt-4">
						<button
							onClick={() => setSoonPage(p => p + 1)}
							disabled={status === 'loading'}
							className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary/80 disabled:opacity-50"
						>
							{status === 'loading' ? 'Đang tải...' : 'Tải thêm'}
						</button>
					</div>
				)}
			</section>
		</div>
	)
}

export default MoviesList
