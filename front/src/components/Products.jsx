//import Product from "./Product.jsx"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {initialProducts} from "../reducers/productReducer.js";
import {useDispatch, useSelector} from "react-redux";

const Products = ({ reviewAverage, addToCart, totalReviews }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.products)

	useEffect(() => {
		dispatch(initialProducts())
	}, [])

	const onSelect = (product) => {
		navigate(`/${product.id}`)
	}

	//TODO make reviews text part disappear if there is no reviews!!

	return (
		<div className={"flex flex-row flex-wrap gap-2.5"}>
			{productList.map(product=>
				<div key={product.id} className={"flex flex-col"}>
					<div className={"h-72 w-48 outline-1 outline-solid"}>
						<div onClick={() => {onSelect(product)}}>
							<img
								src={product.images[0]}
								alt={product.title}
								className={"relative w-48 h-48"}
							/>

							<div className={""}>
								{product.title}
							</div>

							<div className={""}>
								{reviewAverage(product)} {!totalReviews ? <>{totalReviews(product)} reviews</> : <></>}
							</div>

							<div className={""}>
								{product.price}
							</div>
						</div>

						<button className={"rounded-full w-12 h-12 "} onClick={() => {addToCart(product)}}>
							<img
								src={"src/assets/shopping_cart_add.png"}
								alt={"Add me to cart!!"}
							/>
						</button>
					</div>
				</div>
			)}
		</div>

	)
}


export default Products