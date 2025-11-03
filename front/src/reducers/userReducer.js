import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService.js";

const userSlice = createSlice({
	name: "user",
	initialState: {}, // name, username, id, email and an array containing the id's of the products the user has reviewed..
	reducers: {
		setUser(state, action) {
			return action.payload
		},
		clearUser(state) {
			state.user = null
		},
		setWishlist(state, action) {
			state.wishlist.append(action.payload) 
		}
	}
})

export const handierLogoutHandler = () => {
	return async (dispatch) => {
		dispatch(clearUser())
		 // Remove the user from localstorage here as well..
	}
}

export const addToWishlist = (userId, productId) => {
	return async (dispatch) => {
		dispatch(setWishlist(productId))
		const result = userService.addProductToWishlist(userId, productId)
		console.log(result)
	}
}

export const { setUser, clearUser, setWishlist } = userSlice.actions
export default userSlice.reducer