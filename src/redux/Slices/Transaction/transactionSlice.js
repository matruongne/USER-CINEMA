import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	createTransactionAPI,
	getAllTransactionsAPI,
	getTransactionByIdAPI,
	updateTransactionStatusAPI,
} from './transactionAPI'
import { toast } from 'react-hot-toast'

// Create
export const createTransaction = createAsyncThunk(
	'transaction/create',
	async (data, { rejectWithValue }) => {
		try {
			const res = await createTransactionAPI(data)
			toast.success('Tạo giao dịch thành công!')
			return res.data
		} catch (err) {
			toast.error('Tạo giao dịch thất bại!')
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

// Get all
export const getAllTransactions = createAsyncThunk(
	'transaction/getAll',
	async (params, { rejectWithValue }) => {
		try {
			const res = await getAllTransactionsAPI(params)
			return res.data
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

// Get one
export const getTransactionById = createAsyncThunk(
	'transaction/getById',
	async (transactionId, { rejectWithValue }) => {
		try {
			const res = await getTransactionByIdAPI(transactionId)
			return res.data
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

// Update status
export const updateTransactionStatus = createAsyncThunk(
	'transaction/updateStatus',
	async ({ transactionId, status, failure_reason }, { rejectWithValue }) => {
		try {
			const res = await updateTransactionStatusAPI(transactionId, { status, failure_reason })
			toast.success('Cập nhật trạng thái thành công!')
			return res.data
		} catch (err) {
			toast.error('Cập nhật trạng thái thất bại!')
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

const transactionSlice = createSlice({
	name: 'transaction',
	initialState: {
		status: 'idle',
		error: null,
		transactions: [],
		total: 0,
		transactionDetail: null,
		newTransaction: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			// Create
			.addCase(createTransaction.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(createTransaction.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.newTransaction = action.payload
			})
			.addCase(createTransaction.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})

			// Get All
			.addCase(getAllTransactions.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(getAllTransactions.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.transactions = action.payload.transactions
				state.total = action.payload.total
			})
			.addCase(getAllTransactions.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})

			// Get By ID
			.addCase(getTransactionById.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(getTransactionById.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.transactionDetail = action.payload
			})
			.addCase(getTransactionById.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})

			// Update Status
			.addCase(updateTransactionStatus.fulfilled, (state, action) => {
				state.transactionDetail = action.payload
			})
	},
})

export const selectTransactionState = state => state.transaction

export default transactionSlice.reducer
