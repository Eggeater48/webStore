import { createSlice } from "@reduxjs/toolkit"

const shoppingCartSlice = createSlice({
	name: "shoppingCart",
	initialState: [],
	reducers: {
		addToCart(state, action) {
			state.push(action.payload)
		},
		removeFromCart(state, action) {
			return state.filter((product) => product.id  !== action.payload)
		},
		clearCart(state) { // hope this works!!
			return state.initialState
		}
	}
})

export const { addToCart, removeFromCart, clearCart } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer