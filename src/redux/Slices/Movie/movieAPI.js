import axios from 'axios'

export function getAllMoviesAPI({
	search = '',
	sort = 'title',
	order = 'ASC',
	page = 1,
	limit = 10,
}) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(
				`http://localhost:3051/v1/movies/?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`,
				{ withCredentials: true }
			)
			resolve({ data: response.data })
		} catch (err) {
			reject('Error: ' + err.message)
		}
	})
}

export function getMovieByIdAPI(movieId) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(`http://localhost:3051/v1/movies/${movieId}`, {
				withCredentials: true,
			})
			resolve({ data: response.data })
		} catch (err) {
			reject('Error: ' + err.message)
		}
	})
}

export function getNowShowingMoviesByTheaterAPI(theaterId) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(`http://localhost:3051/v1/movies/${theaterId}/now-showing`, {
				withCredentials: true,
			})
			resolve({ data: response.data })
		} catch (err) {
			reject('Error: ' + err.message)
		}
	})
}

export function getNowShowingMoviesByTheaterGroupedAPI(theaterId) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(`http://localhost:3051/v1/movies/${theaterId}/group`, {
				withCredentials: true,
			})
			resolve({ data: response.data })
		} catch (err) {
			reject('Error: ' + err.message)
		}
	})
}

export function searchMoviesAPI(keyword = '') {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(
				`http://localhost:3051/v1/movies/search?q=${encodeURIComponent(keyword)}`,
				{ withCredentials: true }
			)
			resolve({ data: response.data })
		} catch (err) {
			reject('Search Error: ' + err.message)
		}
	})
}
