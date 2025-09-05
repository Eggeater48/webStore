import { createSlice, current } from "@reduxjs/toolkit"
//TODO update array objects to be like {productdata(here), count: of the times it has been added to avoid duplicate keys when rendering in the shopping cart}
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
		findCertainItem(state, action) {
			return state.find(({ id }) => id === action.payload)
		}
	}
})

export const addItemToCartButBetter = (product) => {
	return async (dispatch) => {
		console.log(dispatch(findCertainItem))
		dispatch(addItemToCart({
			...product,
			count: 1
		}))
	}
}

export const { addItemToCart, removeItemFromCart, findCertainItem } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer