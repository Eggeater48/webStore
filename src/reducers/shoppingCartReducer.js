import { createSlice } from "@reduxjs/toolkit"
//TODO update array objects to be like {productdata(here), count: of the times it has been added to avoid duplicate keys when rendering in the shopping cart}
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
				return product.id !== action.payload ? {...product, count: product.count++} : action.payload
			})
		},
	}
})

export const { addItemToCart, removeItemFromCart, increaseItemsCount } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer