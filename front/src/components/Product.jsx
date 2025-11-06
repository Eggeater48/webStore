import Reviews from "./Reviews.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

//import { Await, useLoaderData } from "react-router-dom";
// Just change to using those if the small nitpick doesn't get fixed
const Product = ({ productData, reviewAverage, addToCart, addToWishlist }) => {
	const user = useSelector((state) => state.user)
	const navigate = useNavigate()

	/*
	* 		<div className={"relative"}>
				<img src={productData.images[0]} alt={productData.title} />
			</div>
	*
	* 			<Reviews productData={productData} />
	*  */

	return (
		<div>
			<div className={"h-216 top-20 w-full grid grid-cols-2 overflow-x-hidden outline-black outline-solid outline-1"}>
				<div className={""}>
					Theres supposed to be pictures on this side
				</div>

				<div className={""}>
					<div>I am the title</div>
					<div>€9.79</div>

					<div>I am a long description</div>

					<select name={'product-count'} id={'product-count'}>
						<option value={"1"}>1</option>
						<option value={"2"}>2</option>
						<option value={"3"}>3</option>
						<option value={"4"}>4</option>
						<option value={"5"}>5</option>
						<option value={"6"}>6</option>
						<option value={"7"}>7</option>
						<option value={"8"}>8</option>
						<option value={"9"}>9</option>
						<option value={"10+"}>10+</option>
					</select>

					<button onClick={() => {navigate("/cart")}}>Add to cart</button>
				</div>
			</div>

			<div>
				<div>More details dropdown</div>

				<div>Quality assurance and returns</div>
			</div>

		</div>
	)
}

export default Product