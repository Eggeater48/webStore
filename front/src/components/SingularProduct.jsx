import Reviews from "./Reviews.jsx";
import {useNavigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ReviewWrite from "./ReviewWrite.jsx";
import SingularProductFrame from "./SingularProductFrame.jsx";
import {useEffect} from "react";
import {initialProducts} from "../reducers/productReducer.js";
import YouMayAlsoLike from "./YouMayAlsoLike.jsx";

//import { Await, useLoaderData } from "react-router-dom";
// Just change to using those if the small nitpick doesn't get fixed
// Contains all the cool info but at a deeper and more informative level?
const SingularProduct = ({ reviewAverage, addToCart, addToWishlist, alsoLike, removeFromWishlist }) => {
	const user = useSelector((state) => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const locationState = useLocation()
	const productData = useSelector(state => state.products.find(product => product.id === locationState.pathname.split("/")[1]))

	useEffect(() => {
		dispatch(initialProducts())
	}, [dispatch]);

	const cartAdder = (product) => {
		console.log(product)
		addToCart(product) // TODO NOTIFY USER
	}

	const onAddWishlist = (productId) => {
		if (!user) {
			navigate("/login", { state: locationState })
		} else {
			addToWishlist(productId)
		}
	}

	// This solved a really annoying problem i had, cuz the way i used to conditionally render before wouldnt support "and" for some weird reason
	const renderingHelper = (productId) => { // Might be the goofiest function ive ever made and it might make this a little too overcomplicated altho im not sure
		const addButton = <button
			onClick={() => {onAddWishlist(productData.id)}}
			className={"flex flex-row gap-1 cursor-pointer"}>
			<img src={"/src/assets/heart.svg"} className={""} alt={"Favorite"}/>
			<div className={"text-left"}>
				Add to wishlist
			</div>
		</button>

		const deleteButton = <button
			onClick={() => {removeFromWishlist(productData.id)}}
			className={"flex flex-row gap-1 cursor-pointer"}>
			<img src={"/src/assets/slightly_off_pink_favorite.svg"} className={""} alt={"Already in wishlist"} />
			<div className={"text-left"}>
				Added to wishlist
			</div>
		</button>

		if (!user) {
			return addButton
		} else if (user && !user.wishlist.find(product => product.id === productId)) {
			return addButton
		} else if (user && user.wishlist.find(product => product.id === productId)) {
			return deleteButton
		}
	}

	return (
		<div className={"mt-24"}>
			<div className={"relative h-200 top-12 w-full grid grid-cols-2 overflow-hidden"}>
				<div className={"relative overflow-hidden rounded-md w-3/4 h-3/5 left-1/8"}>
					<img src={productData.images[0]} alt={""} />
				</div>

				<div className={"relative top-4"}>
					<div className={"font-bold text-7xl"}>{productData.title}</div>
					<div className={"mt-6 mb-6"}>€9.79</div>

					<div className={"w-3/4 text-2xl"}>
						{productData.description}
					</div>

					<button className={"bg-blue-500 w-64 h-14 rounded-3xl text-white text-2xl hover:bg-blue-400"}
									onClick={() => {cartAdder(productData)}}>Add to cart
					</button>

					<div className={"flex flex-col gap-3 w-fit pt-6 "}>

						{renderingHelper(productData.id)}

						<div className={"flex flex-row"}>
							<button className={"text-left"}>
								More details dropdown
							</button>

							<div className={""}>
								+
							</div>
						</div>

						<div className={"flex flex-row"}>
							<button className={"text-left"}>
								Quality assurance and returns
							</button>

							<div className={""}>
								+
							</div>
						</div>

					</div>

				</div>
			</div>

			<Reviews productData={productData} reviewAverage={reviewAverage}></Reviews>

			<YouMayAlsoLike products={alsoLike()} addToCart={addToCart} reviewAverage={reviewAverage} />

		</div>
	)
}

export default SingularProduct