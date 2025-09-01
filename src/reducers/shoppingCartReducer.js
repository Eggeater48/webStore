import { createSlice, current } from "@reduxjs/toolkit"

const shoppingCartSlice = createSlice({
	name: "shoppingCart",
	initialState: [],
	reducers: {
		addItemToCart(state, action) {
			state.push(action.payload)
			console.log(current(state))
		},
		removeItemFromCart(state, action) {
			return state.filter((product) => product.id  !== action.payload)
		},
	}
})

export const { addItemToCart, removeItemFromCart } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer