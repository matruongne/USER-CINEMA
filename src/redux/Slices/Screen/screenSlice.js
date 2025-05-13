import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getScreensAPI, createScreenAPI, updateScreenAPI, deleteScreenAPI } from './screenAPI'

const initialState = {
	screens: [],
	status: 'idle',
	error: null,
	pagination: {
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
	},
}

export const getScreens = createAsyncThunk(
	'screen/getScreens',
	async (params, { rejectWithValue }) => {
		try {
			const response = await getScreensAPI(params)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const createScreen = createAsyncThunk(
	'screen/createScreen',
	async (data, { rejectWithValue }) => {
		try {
			const response = await createScreenAPI(data)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const updateScreen = createAsyncThunk(
	'screen/updateScreen',
	async ({ screenId, screenName }, { rejectWithValue }) => {
		try {
			const response = await updateScreenAPI(screenId, screenName)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

export const deleteScreen = createAsyncThunk(
	'screen/deleteScreen',
	async (screenId, { rejectWithValue }) => {
		try {
			const response = await deleteScreenAPI(screenId)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

const screenSlice = createSlice({
	name: 'screen',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getScreens.pending, state => {
				state.status = 'loading'
			})
			.addCase(getScreens.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.screens = action.payload.items
				state.pagination = {
					currentPage: action.payload.currentPage,
					totalPages: action.payload.totalPages,
					totalItems: action.payload.totalItems,
				}
			})
			.addCase(getScreens.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
	},
})

export const selectScreens = state => state.screen.screens
export const selectScreenStatus = state => state.screen.status
export const selectScreenPagination = state => state.screen.pagination

export default screenSlice.reducer
