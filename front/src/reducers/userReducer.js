import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: [], // name, username, id, email and an array containing the id's of the products the user has reviewed..
	reducers: {
		setUser(state, action) {
			return action.payload
		}
	}
})



export const { setUser } = userSlice.actions
export default userSlice.reducer