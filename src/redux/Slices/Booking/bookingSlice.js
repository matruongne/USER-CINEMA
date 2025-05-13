import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBookingAPI, holdSeatsAPI, removeHoldSeatAPI } from './bookingAPI'
import { toast } from 'react-hot-toast'

export const holdSeats = createAsyncThunk(
	'booking/holdSeats',
	async ({ showtimeId, requestedSeats, selectedSeats }, { rejectWithValue }) => {
		try {
			const res = await holdSeatsAPI(showtimeId, { requestedSeats, selectedSeats })
			toast.success('Giữ ghế thành công!')
			return res.data // danh sách ghế được giữ
		} catch (err) {
			toast.error(err.response?.data || 'Giữ ghế thất bại.')
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

export const removeHoldSeat = createAsyncThunk(
	'booking/removeHoldSeat',
	async ({ showtimeId, seatId }, { rejectWithValue }) => {
		try {
			const res = await removeHoldSeatAPI(showtimeId, seatId)
			toast.success('Bỏ giữ ghế thành công!')
			return { seatId, showtimeId } // giữ lại để xử lý reducer
		} catch (err) {
			toast.error(err.response?.data || 'Bỏ giữ ghế thất bại.')
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

export const createBooking = createAsyncThunk(
	'booking/createBooking',
	async ({ showtimeId, seatIds, totalPrice }, { rejectWithValue }) => {
		try {
			const res = await createBookingAPI(showtimeId, { seatIds, totalPrice })
			toast.success('Đặt vé thành công!')
			return res.data // trả về thông tin booking vừa tạo
		} catch (err) {
			toast.error(err.response?.data || 'Tạo booking thất bại.')
			return rejectWithValue(err.response?.data || err.message)
		}
	}
)

const bookingSlice = createSlice({
	name: 'booking',
	initialState: {
		heldSeats: [],
		bookings: [],
		status: 'idle',
		error: null,
		newBooking: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(holdSeats.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(holdSeats.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.heldSeats = action.payload // danh sách ghế được giữ
			})
			.addCase(holdSeats.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(createBooking.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(createBooking.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.newBooking = action.payload // Lưu thông tin booking mới
			})
			.addCase(createBooking.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
			})
			.addCase(removeHoldSeat.fulfilled, (state, action) => {
				const { seatId } = action.payload
				state.heldSeats = state.heldSeats.filter(seat => seat.seat_id !== seatId)
			})
	},
})

export default bookingSlice.reducer
