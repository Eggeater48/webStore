import { createSlice } from "@reduxjs/toolkit"

const shoppingCartSlice = createSlice({
	name: "shoppingCart",
	initialState: [],
	reducers: {
		addItemToCart(state, action) {
			state.push(action.payload)
		},
		removeItemFromCart(state, action) {
			return state.filter((product) => product.id  !== action.payload)
		},
		clearCart(state) { // hope this works!!
			return state.initialState
		}
	}
})

export const { addItemToCart, removeItemFromCart, clearCart } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer