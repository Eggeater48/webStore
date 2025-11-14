import {createSlice} from "@reduxjs/toolkit"

// Pretty much the same idea as userReducer.js
const shoppingCartSlice = createSlice({ // Products could be put into window.localstorage.. If we're feeling fancy
	name: "shoppingCart",
	initialState: [],
	reducers: {
		addItemToCart(state, action) {
			state.push(action.payload)
		},
		removeItemFromCart(state, action) {
			return state.filter((product) => product.id  !== action.payload)
		},
		increaseItemsCount(state, action) {
			return state.map(product => {
				return product.id !== action.payload.id ? product : action.payload
			})
		},
		updateCart(state, action) {
			return state.map(product =>
				product.id === action.payload.id ? action.payload : product
			)
		},
		clearCart(state) {
			return []
		}
	}
})

export const incrementItemCount = (product) => {
	return async dispatch => {
		const updatedProduct = {
			...product,
			count: product.count + 1
		}

		await dispatch(increaseItemsCount(updatedProduct))
	}
}

export const { addItemToCart, removeItemFromCart, increaseItemsCount, updateCart, clearCart } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer