import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTheatersAPI, getTheatersByShowtimeIdsAPI, getTheaterByIdAPI } from './theaterAPI'

const initialState = {
	theaters: [],
	theatersByShowtimeIds: [],
	status: 'idle',
	error: null,
	selectedTheater: null,
	pagination: {
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
	},
}

export const getTheaters = createAsyncThunk(
	'theater/getTheaters',
	async (params, { rejectWithValue }) => {
		try {
			const response = await getTheatersAPI(params)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const getTheatersByShowtimeIds = createAsyncThunk(
	'theater/getTheatersByShowtimeIds',
	async (showtimeIds, { rejectWithValue }) => {
		try {
			const response = await getTheatersByShowtimeIdsAPI(showtimeIds)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const getTheaterById = createAsyncThunk(
	'theater/getTheaterById',
	async (theaterId, { rejectWithValue }) => {
		try {
			const response = await getTheaterByIdAPI(theaterId)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

const theaterSlice = createSlice({
	name: 'theater',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getTheaters.pending, state => {
				state.status = 'loading'
			})
			.addCase(getTheaters.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.theaters = action.payload.items
				state.pagination = {
					currentPage: action.payload.currentPage,
					totalPages: action.payload.totalPages,
					totalItems: action.payload.totalItems,
				}
			})
			.addCase(getTheaters.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(getTheatersByShowtimeIds.pending, state => {
				state.status = 'loading'
			})
			.addCase(getTheatersByShowtimeIds.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.theatersByShowtimeIds = action.payload
			})
			.addCase(getTheatersByShowtimeIds.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(getTheaterById.pending, state => {
				state.status = 'loading'
				state.selectedTheater = null
			})
			.addCase(getTheaterById.fulfilled, (state, { payload }) => {
				state.status = 'succeeded'
				state.selectedTheater = payload
			})
			.addCase(getTheaterById.rejected, (state, { payload }) => {
				state.status = 'failed'
				state.error = payload
			})
	},
})

export const selectTheaters = state => state.theater.theaters
export const selectTheaterStatus = state => state.theater.status
export const selectTheaterPagination = state => state.theater.pagination
export const selectTheatersByShowtimeId = state => state.theater.theatersByShowtimeIds
export const selectSelectedTheater = state => state.theater.selectedTheater

export default theaterSlice.reducer
