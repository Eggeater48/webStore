import axios from "axios";
const baseURL = 'http://localhost:3000/api'

// creeates a new user (no way!!)
const createNewUser = async credentials => {
	const response = await axios.post(`${baseURL}/users/createNew`, credentials).catch(function (error) {
		return error.response.data
	})
	return response.data
}

// Changes an existing user. Tho its kinda hardcoded to only change the address portion of the users data
const changeUser = async (userId, addressSettings) => {
	const response = await axios.put(`${baseURL}/users/change/${userId}`, addressSettings).catch(function (error) {
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
	changeUser,
	login,
	addProductToWishlist,
	removeProductFromWishlist,
}