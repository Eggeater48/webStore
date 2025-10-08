import { createSlice } from "@reduxjs/toolkit"
import productService from "../services/products.js"

const productSlice = createSlice({
	name: "products",
	initialState: [],
	reducers: { // TODO maybe only send different parts of the data to different functions, such as in the initialProducts thing down there!!
		setProducts(state, action) {
			return action.payload
		} // TODO addNew, Remove, change existing, Get by id
	} // TODO also add adding, changing or removing reviews
})

export const initialProducts = () => {
	return async (dispatch) => {
		const result = await productService.getAll()
		dispatch(setProducts(result))
	}
}

export const { setProducts } = productSlice.actions
export default productSlice.reducer