import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {initialProducts} from "../reducers/productReducer.js";
import {useDispatch, useSelector} from "react-redux";
import SingularProductFrame from "./SingularProductFrame.jsx";
import Footer from "./Footer.jsx";

const Products = ({ productData, reviewAverage, totalReviews, addToWishlist, addToCart }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const productList = useSelector(state => state.products)

	// TODO add filtering products by price low to high -> high to low
	useEffect(() => {
		dispatch(initialProducts())
	}, [dispatch])

 	// TODO actually animate the bar color switching and mby make it smaller
	return (
		<div className={""}>
			<div className={"flex flex-row flex-wrap gap-20 mt-24"}>
				{productList.map(product =>
					<SingularProductFrame reviewAverage={reviewAverage} product={product} addToCart={addToCart}/>
				)}
			</div>
			<Footer />
		</div>
	)
}


export default Products