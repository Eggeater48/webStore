import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer.js";
import shoppingCartReducer from "./reducers/shoppingCartReducer.js";

const store = configureStore({
	reducer: {
		products: productReducer,
		shoppingCart: shoppingCartReducer,
	},
});

export default store;