import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { promotionAPI } from './promotionAPI'

const initialState = {
	promotions: [],
	status: 'idle',
	selectedPromotion: null,
	error: null,
	pagination: {
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
	},
}

// Thunks
export const getPromotions = createAsyncThunk(
	'promotion/getPromotions',
	async (params, { rejectWithValue }) => {
		try {
			const res = await promotionAPI.getPromotions(params)
			return res.data
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

export const getPromotionById = createAsyncThunk(
	'promotion/getPromotionById',
	async (id, { rejectWithValue }) => {
		try {
			const res = await promotionAPI.getPromotionByIdAPI(id)
			return res.data
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

// Slice
const promotionSlice = createSlice({
	name: 'promotion',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Get
			.addCase(getPromotions.pending, state => {
				state.status = 'loading'
			})
			.addCase(getPromotions.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.promotions = action.payload.promotions
				state.pagination = {
					currentPage: action.payload.currentPage,
					totalPages: action.payload.totalPages,
					totalItems: action.payload.totalItems,
				}
			})
			.addCase(getPromotions.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(getPromotionById.fulfilled, (state, action) => {
				state.selectedPromotion = action.payload
			})
	},
})

// Selectors
export const selectPromotions = state => state.promotion.promotions
export const selectPromotion = state => state.promotion.selectedPromotion
export const selectPromotionStatus = state => state.promotion.status
export const selectPromotionPagination = state => state.promotion.pagination
export const selectPromotionError = state => state.promotion.error

export default promotionSlice.reducer
