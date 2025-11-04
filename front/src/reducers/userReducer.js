import { createSlice } from "@reduxjs/toolkit";

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

export const { setUser, clearUser, setWishlist } = userSlice.actions
export default userSlice.reducer