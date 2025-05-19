import axios from 'axios'

const BASE_URL = 'http://localhost:3051/v1'

export function holdSeatsAPI(showtimeId, data) {
	return axios.post(`${BASE_URL}/bookings/hold/${showtimeId}`, data, {
		withCredentials: true,
	})
}

export function createBookingAPI(showtimeId, data) {
	return axios.post(`${BASE_URL}/bookings/new/${showtimeId}`, data, {
		withCredentials: true,
	})
}

export function removeHoldSeatAPI(showtimeId, seatId) {
	return axios.post(
		`${BASE_URL}/bookings/remove-hold/${showtimeId}`,
		{ seatId },
		{ withCredentials: true }
	)
}

export function getBookingHistoryAPI() {
	return axios.get(`${BASE_URL}/bookings/own/`, {
		withCredentials: true,
	})
}

export function cancelBookingAPI(bookingId) {
	return axios.post(`${BASE_URL}/bookings/cancel/${bookingId}`, {}, { withCredentials: true })
}
