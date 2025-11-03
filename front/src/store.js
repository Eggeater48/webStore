import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer.js";
import shoppingCartReducer from "./reducers/shoppingCartReducer.js";
import userReducer from "./reducers/userReducer.js";

// TODO remember to finish / atleast start the filterReducer
const store = configureStore({
	reducer: {
		products: productReducer,
		shoppingCart: shoppingCartReducer,
		user: userReducer,
	},
})

export default store;