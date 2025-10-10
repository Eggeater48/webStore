import Reviews from "./Reviews.jsx";
//import { Await, useLoaderData } from "react-router-dom";
// Just change to using those if the small nitpick doesn't get fixed
const Product = ({ productData, reviewAverage, addToCart }) => {
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

			<Reviews productData={productData} />

		</div>
	)
}

export default Product