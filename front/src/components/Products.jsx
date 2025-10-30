import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {initialProducts} from "../reducers/productReducer.js";
import {useDispatch, useSelector} from "react-redux";
import { addToWishlist } from "../reducers/userReducer.js";

const Products = ({ reviewAverage, addToCart, totalReviews }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.products)
	const user = useSelector((state) => state.user)

	useEffect(() => {
		dispatch(initialProducts())
	}, [dispatch])

	const onSelect = (product) => {
		navigate(`/${product.id}`)
	}

	const wishlister = (productId) => {
		console.log(`Adding product at id ${productId} to wishlist`)
		if (!user) {
			navigate('/login')
		} else if (productList.find(product => product.id === productId)) {	
			console.log('Product is already in your wishlist') // This part could be handled better, since im not entirely sure about how this interaction is handled
		}	else {
			dispatch(addToWishlist(
				user.id,
				productId
			))
		}
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

						<button className={"rounded-full w-12 h-12"} onClick={() => {wishlister(product.id)}}>
							Add to wishlist ig
						</button>

						<button className={"rounded-full w-12 h-12"} onClick={() => {addToCart(product)}}>
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