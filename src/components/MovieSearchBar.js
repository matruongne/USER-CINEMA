import React, { useState, useEffect, useCallback } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import debounce from 'lodash.debounce'
import {
	searchMoviesAsync,
	selectSearchResults,
	selectMovieStatus,
	clearSearchResults,
} from '../redux/Slices/Movie/movieSlice'

import { getSearchHistory, addSearchHistory, removeHistoryItem } from '../helpers/searchHistory'

const MovieSearchBar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const searchResults = useSelector(selectSearchResults)
	const searchStatus = useSelector(selectMovieStatus)

	const [searchTerm, setSearchTerm] = useState('')
	const [showResults, setShowResults] = useState(false)
	const [history, setHistory] = useState([])

	const debouncedSearch = useCallback(
		debounce(term => {
			if (term.trim()) {
				dispatch(searchMoviesAsync(term.trim()))
				addSearchHistory(term.trim())
				setHistory(getSearchHistory())
				setShowResults(true)
			}
		}, 500),
		[]
	)

	useEffect(() => {
		if (searchTerm.trim()) {
			debouncedSearch(searchTerm)
		} else {
			setShowResults(false)
			setHistory(getSearchHistory())
		}
		return () => debouncedSearch.cancel()
	}, [searchTerm, debouncedSearch])

	const handleSelect = movie => {
		setSearchTerm('')
		setShowResults(false)
		dispatch(clearSearchResults())
		navigate(`/booking/${movie.movie_id}`)
	}

	const handleSearchClick = () => {
		if (searchTerm.trim()) {
			debouncedSearch(searchTerm)
		}
	}

	return (
		<div className="relative w-full md:w-1/3">
			<input
				type="text"
				placeholder="Tìm phim, thể loại, diễn viên"
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className="w-full px-4 py-2 rounded-full bg-primary outline-none text-black"
				onFocus={() => {
					if (searchResults.length > 0 || history.length > 0) setShowResults(true)
				}}
				onBlur={() => setTimeout(() => setShowResults(false), 200)}
			/>
			<button
				className="p-2 bg-secondary absolute w-[40px] h-[40px] rounded-r-full right-0 top-0 hover:bg-secondary/80 flex items-center justify-center"
				onClick={handleSearchClick}
			>
				{searchStatus === 'loading' ? (
					<Loader2 className="animate-spin text-white" size={18} />
				) : (
					<Search className="text-white" size={18} />
				)}
			</button>

			{showResults && (
				<div className="absolute z-50 top-full left-0 w-full mt-1 bg-white rounded-md shadow-md max-h-[90vh] overflow-y-auto border border-gray-200 transition-all duration-200 ease-in-out">
					{searchStatus === 'loading' ? (
						<p className="px-4 py-2 text-gray-500 italic">Đang tìm kiếm...</p>
					) : searchResults.length > 0 ? (
						searchResults.map(movie => (
							<div
								key={movie.movie_id}
								className="flex items-start gap-4 px-4 py-4 hover:bg-gray-100 cursor-pointer border-b transition"
								onMouseDown={() => handleSelect(movie)}
							>
								<img
									src={movie.poster_url}
									alt={movie.title}
									className="w-16 h-20 object-cover rounded shadow"
								/>
								<div className="flex-1">
									<p className="font-semibold text-base text-black">{movie.title}</p>
									<p className="text-sm text-gray-700">
										<span className="font-medium text-gray-800">Thể loại:</span>{' '}
										{movie.Genres?.map(g => g.genre_name).join(', ') || 'Không rõ'}
									</p>
									<p className="text-sm text-gray-700">
										<span className="font-medium text-gray-800">Diễn viên:</span>{' '}
										{movie.Actors?.map(a => a.name).join(', ') || 'Không rõ'}
									</p>
								</div>
							</div>
						))
					) : (
						<>
							{history.length > 0 ? (
								<>
									<div className="px-4 pt-3 pb-1 text-gray-600 text-sm">Tìm kiếm gần đây:</div>
									{history.map(term => (
										<div
											key={term}
											className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 text-sm text-black cursor-pointer"
											onMouseDown={() => {
												setSearchTerm(term)
												handleSearchClick()
											}}
										>
											<span>{term}</span>
											<button
												className="text-red-500 text-xs hover:text-red-700"
												onMouseDown={e => {
													e.stopPropagation()
													removeHistoryItem(term)
													setHistory(getSearchHistory())
												}}
											>
												X
											</button>
										</div>
									))}
								</>
							) : (
								<p className="px-4 py-2 text-gray-500 italic">Không có phim cần tìm</p>
							)}
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default MovieSearchBar
