import axios from "axios";

const baseURL = 'localhost:3000/api/users'

const getAllUsers = () => {
	const response = axios.get(`${baseURL}/getAll`)
	return response.data
}

const removeUser = (userID) => {
	const response = axios.delete(`${baseURL}/removeUser`).catch(function (error) {
		return error.response.data
	})
	return response.data
}

export default { getAllUsers, removeUser }