import axios from 'axios'

export const promotionAPI = {
	getPromotions: params =>
		axios.get(
			'http://localhost:3051/v1/promotions',
			{ params },
			{
				withCredentials: true,
			}
		),
	getPromotionByIdAPI: id => {
		return axios.get(`http://localhost:3051/v1/promotions/${id}`, {
			withCredentials: true,
		})
	},
}
