import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getShowtimesByScreenAPI, getAllShowDatesByMovieAPI } from './showtimeAPI'

export const getShowtimesByScreen = createAsyncThunk(
	'showtime/getShowtimesByScreen',
	async (screenId, { rejectWithValue }) => {
		try {
			const response = await getShowtimesByScreenAPI(screenId)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const getAllShowDatesByMovie = createAsyncThunk(
	'showtime/getAllShowDatesByMovie',
	async (movieId, { rejectWithValue }) => {
		try {
			const response = await getAllShowDatesByMovieAPI(movieId)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

const showtimeSlice = createSlice({
	name: 'showtime',
	initialState: {
		showtimes: [],
		showDates: [],
		status: 'idle',
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(getShowtimesByScreen.fulfilled, (state, action) => {
				state.showtimes = action.payload
				state.status = 'succeeded'
			})
			.addCase(getShowtimesByScreen.rejected, (state, action) => {
				state.showtimes = []
				state.status = 'rejected'
			})
			.addCase(getAllShowDatesByMovie.fulfilled, (state, action) => {
				state.showDates = action.payload
				state.status = 'succeeded'
			})
			.addCase(getAllShowDatesByMovie.rejected, (state, action) => {
				state.showDates = []
				state.status = 'rejected'
			})
	},
})

export const selectShowtimes = state => state.showtime.screens
export const selectShowDates = state => state.showtime.showDates

export default showtimeSlice.reducer
