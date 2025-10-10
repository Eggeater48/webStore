import { createSlice } from "@reduxjs/toolkit"
import productService from "../services/products.js"

const productSlice = createSlice({
	name: "products",
	initialState: [],
	reducers: {
		setProducts(state, action) {
			return action.payload
		},
/*		addReview(state, action) {
			return state.map(product => {

			})
		}*/
	}
})

export const initialProducts = () => {
	return async (dispatch) => {
		const result = await productService.getAll()
		dispatch(setProducts(result))
	}
}

export const addNewReview = () => {
	return async (dispatch) => {

	}
}

export const { setProducts } = productSlice.actions
export default productSlice.reducer