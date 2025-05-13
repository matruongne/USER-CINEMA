import axios from 'axios'

export function getShowtimesByScreenAPI(screenId) {
	return axios.get(`http://localhost:3051/v1/screens/by-screen/${screenId}`, {
		withCredentials: true,
	})
}

export function getAllShowDatesByMovieAPI(movieId) {
	return axios.get(`http://localhost:3051/v1/showdates/?movieId=${movieId}`, {
		withCredentials: true,
	})
}
