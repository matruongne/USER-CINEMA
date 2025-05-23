import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	getAllMoviesAPI,
	getMovieByIdAPI,
	getNowShowingMoviesByTheaterAPI,
	getNowShowingMoviesByTheaterGroupedAPI,
	searchMoviesAPI,
} from './movieAPI'

const initialState = {
	movies: [],
	status: 'idle',
	error: null,
	selectedMovie: null,
	pagination: {
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
	},
	nowShowingMovies: [],
	searchResults: [],
}

export const getAllMoviesAsync = createAsyncThunk(
	'movie/getAllMovies',
	async (params, { rejectWithValue }) => {
		try {
			const response = await getAllMoviesAPI(params)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const getMovieByIdAsync = createAsyncThunk(
	'movie/getMovieById',
	async (movieId, { rejectWithValue }) => {
		try {
			const response = await getMovieByIdAPI(movieId)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const getNowShowingMoviesByTheaterAsync = createAsyncThunk(
	'movie/getNowShowingMoviesByTheater',
	async (theaterId, { rejectWithValue }) => {
		try {
			const response = await getNowShowingMoviesByTheaterAPI(theaterId)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const getNowShowingMoviesByTheaterGroupedAsync = createAsyncThunk(
	'movie/getNowShowingMoviesByTheaterGrouped',
	async (theaterId, { rejectWithValue }) => {
		try {
			const response = await getNowShowingMoviesByTheaterGroupedAPI(theaterId)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const searchMoviesAsync = createAsyncThunk(
	'movie/searchMovies',
	async (keyword, { rejectWithValue }) => {
		try {
			const response = await searchMoviesAPI(keyword)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		clearSearchResults: state => {
			state.searchResults = []
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getAllMoviesAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(getAllMoviesAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.movies = action.payload.items
				state.pagination = {
					currentPage: action.payload.currentPage,
					totalPages: action.payload.totalPages,
					totalItems: action.payload.totalItems,
				}
			})
			.addCase(getAllMoviesAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(getMovieByIdAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(getMovieByIdAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.selectedMovie = action.payload
			})
			.addCase(getMovieByIdAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(getNowShowingMoviesByTheaterAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(getNowShowingMoviesByTheaterAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.nowShowingMovies = action.payload
			})
			.addCase(getNowShowingMoviesByTheaterAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(searchMoviesAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(searchMoviesAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.searchResults = action.payload
			})
			.addCase(searchMoviesAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
	},
})

export const selectMovies = state => state.movie.movies
export const selectMovieStatus = state => state.movie.status
export const selectMoviePagination = state => state.movie.pagination
export const selectMovieError = state => state.movie.error
export const selectSelectedMovie = state => state.movie.selectedMovie
export const selectNowShowingMovies = state => state.movie.nowShowingMovies
export const selectSearchResults = state => state.movie.searchResults
export const { clearSearchResults } = movieSlice.actions

export default movieSlice.reducer
