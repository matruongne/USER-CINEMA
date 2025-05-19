import axios from 'axios'

const BASE_URL = 'http://localhost:3051/v1'

export function createTransactionAPI(data) {
	return axios.post(`${BASE_URL}/transactions`, data, { withCredentials: true })
}

export function getAllTransactionsAPI(params) {
	return axios.get(`${BASE_URL}/transactions`, {
		params,
		withCredentials: true,
	})
}

export function getTransactionByIdAPI(transactionId) {
	return axios.get(`${BASE_URL}/transactions/${transactionId}`, {
		withCredentials: true,
	})
}

export function updateTransactionStatusAPI(transactionId, data) {
	return axios.patch(`${BASE_URL}/transactions/${transactionId}/status`, data, {
		withCredentials: true,
	})
}
