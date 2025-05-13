import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSeatsByScreenAPI } from './seatAPI'

const initialState = {
	seats: [],
	status: 'idle',
	error: null,
	pagination: {
		totalItems: 0,
	},
}

export const getSeatsByScreen = createAsyncThunk(
	'seat/getSeatsByScreen',
	async (params, { rejectWithValue }) => {
		try {
			const response = await getSeatsByScreenAPI(params)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

const seatSlice = createSlice({
	name: 'seat',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getSeatsByScreen.pending, state => {
				state.status = 'loading'
			})
			.addCase(getSeatsByScreen.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.seats = action.payload.items
				state.pagination.totalItems = action.payload.totalItems
			})
			.addCase(getSeatsByScreen.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
	},
})

export const selectSeats = state => state.seat.seats
export const selectSeatStatus = state => state.seat.status
export const selectSeatPagination = state => state.seat.pagination

export default seatSlice.reducer
