import axios from 'axios'

export function getScreensAPI({
	theaterId,
	search = '',
	sort = 'screen_name',
	order = 'ASC',
	page = 1,
	limit = 10,
}) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(
				`http://localhost:3051/v1/screens?theaterId=${theaterId}&search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`,
				{ withCredentials: true }
			)
			resolve({ data: response.data })
		} catch (err) {
			reject('Error: ' + err.message)
		}
	})
}

export function createScreenAPI(data) {
	return axios.post(`http://localhost:3051/v1/screens/new`, data, { withCredentials: true })
}

export function updateScreenAPI(screenId, screenName) {
	return axios.patch(
		`http://localhost:3051/v1/screens/${screenId}`,
		{ screenName },
		{ withCredentials: true }
	)
}

export function deleteScreenAPI(screenId) {
	return axios.delete(`http://localhost:3051/v1/screens/${screenId}`, { withCredentials: true })
}
