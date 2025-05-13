import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAsync, selectMovieStatus } from '../redux/Slices/Movie/movieSlice'

const Booking = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const status = useSelector(selectMovieStatus)

	const [activeTab, setActiveTab] = useState('nowShowing')
	const [nowShowing, setNowShowing] = useState([])
	const [comingSoon, setComingSoon] = useState([])

	const [page, setPage] = useState(1)
	const [done, setDone] = useState(false)

	const today = new Date()

	useEffect(() => {
		const fetchMovies = async () => {
			const { payload } = await dispatch(getAllMoviesAsync({ page, limit: 8 }))
			if (!payload) return

			const now = payload.items.filter(m => new Date(m.release_date) <= today)
			const soon = payload.items.filter(m => new Date(m.release_date) > today)

			setNowShowing(prev => {
				const newMovies = now.filter(m => !prev.some(e => e.movie_id === m.movie_id))
				return [...prev, ...newMovies]
			})

			setComingSoon(prev => {
				const newMovies = soon.filter(m => !prev.some(e => e.movie_id === m.movie_id))
				return [...prev, ...newMovies]
			})

			if (payload.items.length === 0) setDone(true)
		}

		fetchMovies()
	}, [page, dispatch])

	const handleMovieClick = movie => {
		navigate(`/booking/${movie.movie_id}`)
	}

	const renderMovieGrid = movies => (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{movies.map(movie => (
				<div
					key={movie.movie_id}
					className="bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer group"
					onClick={() => handleMovieClick(movie)}
				>
					<div className="w-full aspect-[2/3] overflow-hidden">
						<img
							src={movie.poster_url}
							alt={movie.title}
							className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</div>
					<div className="p-4 text-white">
						<h3 className="text-lg font-bold text-yellow-400">{movie.title}</h3>
						<p className="text-sm">
							{movie.duration} phút • {movie.release_date}
						</p>
					</div>
				</div>
			))}
		</div>
	)

	return (
		<div className="container mx-auto px-4 py-8 text-white">
			{/* Steps */}
			<div className="flex justify-between mb-6">
				{['Chọn rạp', 'Chọn phim', 'Chọn ngày', 'Chọn suất'].map((step, index) => (
					<div key={step} className="text-center">
						<div className="w-10 h-10 rounded-full bg-yellow-500 text-black font-bold flex items-center justify-center mx-auto mb-2">
							{index + 1}
						</div>
						<p className="text-black">{step}</p>
					</div>
				))}
			</div>

			{/* Tabs */}
			<div className="flex border-b border-gray-700 mb-6">
				<button
					className={`flex-1 px-6 py-4 text-2xl font-bold ${
						activeTab === 'nowShowing'
							? 'border-b-4 border-yellow-400 text-yellow-400'
							: 'text-gray-400 hover:text-white'
					}`}
					onClick={() => setActiveTab('nowShowing')}
				>
					Phim Đang Chiếu
				</button>
				<button
					className={`flex-1 px-6 py-4 text-2xl font-bold ${
						activeTab === 'comingSoon'
							? 'border-b-4 border-yellow-400 text-yellow-400'
							: 'text-gray-400 hover:text-white'
					}`}
					onClick={() => setActiveTab('comingSoon')}
				>
					Phim Sắp Chiếu
				</button>
			</div>

			{/* Movie Grid */}
			{renderMovieGrid(activeTab === 'nowShowing' ? nowShowing : comingSoon)}

			{!done && (
				<div className="text-center mt-6">
					<button
						onClick={() => setPage(p => p + 1)}
						disabled={status === 'loading'}
						className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary/80 disabled:opacity-50"
					>
						{status === 'loading' ? 'Đang tải...' : 'Tải thêm'}
					</button>
				</div>
			)}
		</div>
	)
}

export default Booking
