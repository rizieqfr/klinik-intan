import axios from 'axios'

const apiService = axios.create({
	baseURL: 'http://localhost:5005/',
	timeout: 60000
})

export default apiService
