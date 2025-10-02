import axios from "axios";
const baseUrl = "http://localhost:3000/api/products"

const getAll = () => {
	const request = axios.get(`${baseUrl}/getAll`)
	return request.then((response) => response.data)
}

export default { getAll }