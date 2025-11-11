import { createSlice } from "@reduxjs/toolkit";

// Handles the user data on the frontend, saving alot of precious lines of code
const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload
		},
		clearUser(state) {
			state.user = null
		},
		setWishlist(state, action) {
			state.wishlist = action.payload
		},
		removeProductFromWishlist(state, action) {
			state.wishlist = state.wishlist.filter((product) => product.id !== action.payload)
		}
	}
})

export const { setUser, clearUser, setWishlist, removeProductFromWishlist } = userSlice.actions
export default userSlice.reducer