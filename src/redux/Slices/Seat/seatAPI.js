import axios from 'axios'

export const getSeatsByScreenAPI = async params => {
	return await axios.get('http://localhost:3051/v1/seats', { params }, { withCredentials: true })
}
