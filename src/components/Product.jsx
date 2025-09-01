import { useDispatch } from "react-redux";
import {addItemToCart} from "../reducers/shoppingCartReducer.js";

const Product = ({ productData, reviewAverage }) => {
	//TODO make a function that calculates the average of the products reviews
	const dispatch = useDispatch()

	const addToCart = (event) => {
		// TODO send title, price, availabilityStatus, warrantyInformation and shippingInformation to the shoppingCartReducer
		event.preventDefault()
		dispatch(addItemToCart(
			{
				id: productData.id,
				title: productData.title,
				price: productData.price,
				availability: productData.availabilityStatus,
				warranty: productData.warrantyInformation,
				shipping: productData.shippingInformation
			}
		))
	}

	return ( // className={"relative h-32 w-32"}
		<div>
			<div className={"relative w-40 h-40"}>
				<img src={productData.images[0]} alt={productData.title} />
			</div>

			<div>
				{productData.title}
			</div>

			<div>
				{reviewAverage(productData)}/5
			</div>

			<div>
				{productData.price}
			</div>

			<div onClick={addToCart}>
				<img src={"/assets/shopping_cart_add.png"} alt={'add to cart'} />
			</div>
		</div>
	)
}

export default Product