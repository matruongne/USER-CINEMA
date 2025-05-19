import axios from 'axios'

export function getLoggedInUser() {
	return new Promise(async resolve => {
		await axios
			.get('http://localhost:3051/v1/user/profile', { withCredentials: true })
			.then(response => {
				resolve({ data: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	})
}

export function updateUser(update) {
	return new Promise(async resolve => {
		await axios
			.patch(`http://localhost:3051/v1/user/profile`, update, {
				withCredentials: true,
			})
			.then(response => {
				resolve({ data: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	})
}
export function updateUserAddress(updateData) {
	return axios.patch(
		`http://localhost:3051/v1/user/profile/address`,
		{ formatted: updateData },
		{
			withCredentials: true,
		}
	)
}
export function updatePassword(update) {
	return new Promise(async resolve => {
		await axios
			.patch(`http://localhost:3051/v1/user/profile/password`, update, {
				withCredentials: true,
			})
			.then(response => {
				resolve({ data: response.data })
			})
			.catch(error => {
				resolve(error)
			})
	})
}

export function getlistUsers() {
	return new Promise(async resolve => {
		await axios
			.get('http://localhost:3051/v1/admin/users', {
				withCredentials: true,
			})
			.then(response => {
				resolve({ data: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	})
}

export function getAllRoles() {
	return new Promise(async resolve => {
		await axios
			.get(`http://localhost:3051/v1/admin/roles`, {
				withCredentials: true,
			})
			.then(response => {
				resolve({ data: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	})
}
export function updateUserRole({ targetUserId, roleId }) {
	return new Promise(async resolve => {
		await axios
			.patch(
				`http://localhost:3051/v1/admin/users/${targetUserId}/role/`,
				{ role_id: roleId },
				{
					withCredentials: true,
				}
			)
			.then(response => {
				resolve({ data: response.data })
			})
			.catch(error => {
				console.log(error)
			})
	})
}

export function getUserWallet(userId) {
	return axios.get(`http://localhost:3051/v1/wallet/${userId}`, {
		withCredentials: true,
	})
}

export function updateUserWallet(userId, walletUpdate) {
	return axios.patch(`http://localhost:3051/v1/wallet/${userId}`, walletUpdate, {
		withCredentials: true,
	})
}
