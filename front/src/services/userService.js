import axios from "axios";
const baseURL = 'http://localhost:3000/api'

const createNewUser = async credentials => {
	const response = await axios.post(`${baseURL}/api/createNew`, credentials)
	return response.data
}

const login = async credentials => {
	const response = await axios.post(`${baseURL}/login`, credentials)
	return response.data
}

const addProductToWishlist = async details => {
	const response = await axios.post(`${baseURL}/`)
}

export default {
	createNewUser,
	login,
	addProductToWishlist
}