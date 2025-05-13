import axios from 'axios'

export function getTheatersAPI({
	search = '',
	sort = 'name',
	order = 'ASC',
	page = 1,
	limit = 10,
}) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(
				`http://localhost:3051/v1/theaters?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`,
				{ withCredentials: true }
			)
			resolve({ data: response.data })
		} catch (err) {
			reject('Error: ' + err.message)
		}
	})
}

export function getTheatersByShowtimeIdsAPI(showtimeIds = []) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(
				`http://localhost:3051/v1/theaters/by-showtimes?ids=${showtimeIds.join(',')}`,
				{ withCredentials: true }
			)
			resolve({ data: response.data })
		} catch (err) {
			reject('Error: ' + err.message)
		}
	})
}
