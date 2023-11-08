import axios from 'axios'
import conf from '../config.json'

const url = conf.API.endpointProduction

export default axios.create({
	baseURL: url,
	// timeout: conf.API.timeout,
})

axios.interceptors.response.use((response) => {
	if (response.data) {
		if (response.status === 200) {
			return response
		}
		
		return Promise.reject(response)
	}

	return Promise.reject(response)
}, (error) => {return Promise.reject(error)})

export const config = {
	api: {
		txs: '/api/txs',
		drip: '/api/drip',
		support: '/api/support'
	},
	ip: '/ip',
	status: '/status',
}