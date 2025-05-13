import axios from 'axios'

export function createUser({ username, password, email }) {
	return new Promise(async (resolve, reject) => {
		await axios
			.post('http://localhost:3051/v1/auth/register', { username, password, email })
			.then(response => {
				const data = response.data
				if (data.success) {
					resolve(data)
				} else {
					reject(data.message || 'Đăng ký không thành công')
				}
			})
			.catch(err => {
				reject('Error: ' + err.message)
			})
	})
}

export function verifyAccount({ email, verifyCode }) {
	return new Promise(async (resolve, reject) => {
		await axios
			.post('http://localhost:3051/v1/auth/verify', { email, verifyCode })
			.then(response => {
				const data = response.data

				if (data.success) {
					resolve(data)
				}
			})
			.catch(err => {
				reject('Error: ' + err.message)
			})
	})
}

export function resendVerificationCode({ email }) {
	return new Promise(async (resolve, reject) => {
		await axios
			.post('http://localhost:3051/v1/auth/resend-verification-code', { email })
			.then(response => {
				const data = response.data
				if (data.success) {
					resolve(data)
				}
			})
			.catch(err => {
				reject('Error: ' + err.message)
			})
	})
}

export function loginUser({ username, password }) {
	return new Promise(async (resolve, reject) => {
		await axios
			.post(
				'http://localhost:3051/v1/auth/login',
				{ username, password },
				{ withCredentials: true }
			)
			.then(response => {
				const data = response.data
				if (data) {
					resolve(data)
				}
			})
			.catch(err => {
				reject('Error: ' + err.message)
			})
	})
}

export function refreshToken({ refreshToken }) {
	return new Promise(async (resolve, reject) => {
		await axios
			.post(
				'http://localhost:3051/v1/auth/refresh-token',
				{ refreshToken },
				{ withCredentials: true }
			)
			.then(response => {
				resolve({ data: response.token })
			})
			.catch(err => {
				reject('Error: ' + err.message)
			})
	})
}

export function checkAuth() {
	return new Promise(async (resolve, reject) => {
		await axios
			.get('http://localhost:3051/v1/auth/check', { withCredentials: true })
			.then(response => {
				resolve({ data: response.data })
			})
			.catch(err => {
				reject('Error: ' + err.message)
			})
	})
}

export function signOut() {
	return new Promise(async (resolve, reject) => {
		await axios
			.get('http://localhost:3051/v1/auth/logout', { withCredentials: true })
			.then(response => {
				resolve({ data: response.data })
			})
			.catch(err => {
				reject('Error: ' + err.message)
			})
	})
}
