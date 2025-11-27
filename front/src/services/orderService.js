// TODO maybe rename this file at some point

import axios from 'axios'
const baseURL = 'localhost:3000/api/purchases'

const getAllOrders = async () => {
	const response = await axios.get(`${baseURL}/orders`)
	return response.data
}

const getSpecificOrder = async orderId => {
	const response = await axios.get(`${baseURL}/orders/${orderId}`)
	return response.data
}

const checkOut = async details => {
	const response = await axios
		.post(`${baseURL}/checkout`, details.products, {
			headers : {
				'Authorization' : `Bearer `
			}
		})
	return response.data
}

export default { getAllOrders, getSpecificOrder, checkOut }