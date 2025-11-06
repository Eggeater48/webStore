import axios from "axios";
const baseURL = 'http://localhost:3000/api'

const createNewUser = async credentials => {
	const response = await axios.post(`${baseURL}/users/createNew`, credentials).catch(function (error) {
		return error.response.data
	})
	return response.data
}

const login = async credentials => {
	const response = await axios.post(`${baseURL}/login`, credentials).catch(function (error) {
		return error.response.data
	})
	return response.data
}

const addProductToWishlist = async (userId, productId) => {
	const response = await axios.post(`${baseURL}/users/addToWishlist/${userId}/${productId}`).catch(function (error) {
		return error.response.data
	})
	return response.data
}

const removeProductFromWishlist = async (userId, productId) => {
	const response = await axios.post(`${baseURL}/users/removeFromWishlist/${userId}/${productId}`).catch(function (error) {
		return error.response.data
	})
	return response.data
}

export default {
	createNewUser,
	login,
	addProductToWishlist,
	removeProductFromWishlist
}