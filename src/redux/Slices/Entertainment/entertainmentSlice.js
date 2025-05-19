import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { entertainmentAPI } from './entertainmentAPI'

const initialState = {
	entertainments: [],
	status: 'idle',
	selectedEntertainment: null,
	error: null,
	pagination: {
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
	},
}

// Thunks
export const getEntertainments = createAsyncThunk(
	'entertainment/getEntertainments',
	async (params, { rejectWithValue }) => {
		try {
			const res = await entertainmentAPI.getEntertainments(params)
			return res.data
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

export const getEntertainmentById = createAsyncThunk(
	'entertainment/getEntertainmentById',
	async (id, { rejectWithValue }) => {
		try {
			const res = await entertainmentAPI.getEntertainmentByIdAPI(id)
			return res.data
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

// Slice
const entertainmentSlice = createSlice({
	name: 'entertainment',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Get
			.addCase(getEntertainments.pending, state => {
				state.status = 'loading'
			})
			.addCase(getEntertainments.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.entertainments = action.payload.entertainments
				state.pagination = {
					currentPage: action.payload.currentPage,
					totalPages: action.payload.totalPages,
					totalItems: action.payload.totalItems,
				}
			})
			.addCase(getEntertainments.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(getEntertainmentById.fulfilled, (state, action) => {
				state.selectedEntertainment = action.payload
			})
	},
})

// Selectors
export const selectEntertainments = state => state.entertainment.entertainments
export const selectEntertainment = state => state.entertainment.selectedEntertainment
export const selectEntertainmentStatus = state => state.entertainment.status
export const selectEntertainmentPagination = state => state.entertainment.pagination
export const selectEntertainmentError = state => state.entertainment.error

export default entertainmentSlice.reducer
