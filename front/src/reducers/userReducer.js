import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService.js";


const userSlice = createSlice({
	name: "user",
	initialState: null, // name, username, id, email and an array containing the id's of the products the user has reviewed..
	reducers: {
		setUser(state, action) {
			return action.payload
		},
		clearUser(state) {
			state.user = null
		},
	}
})

export const handierLoginHandler = (userDetails) => {
	return async (dispatch) => {
		// Im supposed to remove the user from window.localstorage
		const result = await userService.login(userDetails)
		console.log(result)
		//dispatch(setUser(userDetails))
	}
}

export const handierLogoutHandler = () => {
	return async (dispatch) => {
		dispatch(clearUser())

	}
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer