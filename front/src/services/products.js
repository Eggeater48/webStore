import axios from "axios";
const baseUrl = "http://localhost:3000/api/products"

const getAll = async () => {
	const response = await axios.get(`${baseUrl}/getAll`)
	return response.data
}

const addNew = async newProduct => {
	const token = 3 // Fix this at some point
	const response = await axios.post(`${baseUrl}/addNew`, newProduct, {
		headers : {
			'Authorization' : `Bearer ${token}`
		}
	})

	return response.data
}

export default { getAll }