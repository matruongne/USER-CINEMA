import axios from 'axios'

export const entertainmentAPI = {
	getEntertainments: params =>
		axios.get(
			'http://localhost:3051/v1/entertainments',
			{ params },
			{
				withCredentials: true,
			}
		),
	getEntertainmentByIdAPI: id => {
		return axios.get(`http://localhost:3051/v1/entertainments/${id}`, {
			withCredentials: true,
		})
	},
}
