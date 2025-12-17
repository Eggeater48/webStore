import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/userService.js";

const userSlice = createSlice({
	name: "users",
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload
		}
	}
})

export const getAndSetUsers = () => {
	return async (dispatch) => {
		const result = await userService.getAllUsers()
		dispatch(setUsers(result))
	}
}

export const { setUsers } = userSlice.actions
export default userSlice.reducer