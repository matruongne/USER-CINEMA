import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/User/userSlice'
import authReducer from './Slices/Auth/authSlice'
import movieReducer from './Slices/Movie/movieSlice'
import theaterReducer from './Slices/Theater/theaterSlice'
import screenReducer from './Slices/Screen/screenSlice'
import showtimeReducer from './Slices/Showtime/showtimeSlice'
import bookingReducer from './Slices/Booking/bookingSlice'
import seatReducer from './Slices/Seat/seatSlice'
import promotionReducer from './Slices/Promotion/promotionSlice'
import entertainmentReducer from './Slices/Entertainment/entertainmentSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
		movie: movieReducer,
		theater: theaterReducer,
		screen: screenReducer,
		seat: seatReducer,
		showtime: showtimeReducer,
		booking: bookingReducer,
		promotion: promotionReducer,
		entertainment: entertainmentReducer,
	},
})
