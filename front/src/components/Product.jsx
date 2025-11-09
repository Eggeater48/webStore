import Reviews from "./Reviews.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import ReviewWrite from "./ReviewWrite.jsx";

//import { Await, useLoaderData } from "react-router-dom";
// Just change to using those if the small nitpick doesn't get fixed
const Product = ({ productData, reviewAverage, addToCart, addToWishlist }) => {
	const user = useSelector((state) => state.user)
	const navigate = useNavigate()
	// TODO add the add to wishlist button
	return (
		<div>
			<div className={"relative h-216 top-12 w-full grid grid-cols-2 overflow-x-hidden outline-black outline-solid outline-1 overflow-hidden"}>
				<div className={"relative rounded-md outline-neutral-500 outline-solid outline-1 w-3/4 h-3/5 left-1/8"}>
					<img src={productData.images[0]} />
				</div>

				<div className={"relative top-4"}>
					<div className={"font-bold text-7xl"}>{productData.title}</div>
					<div className={"mt-6 mb-6"}>€9.79</div>

					<div className={"w-3/4 text-2xl"}>
						{productData.description}
					</div>

					<div className={"mt-3"}>
						<select
							className={"outline-gray-500 outline-solid outline-1 w-28 h-14 text-2xl text-center rounded-xs"}
							name={'product-count'}
							id={'product-count'}>
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

						<button className={"bg-blue-500 w-64 h-14 rounded-3xl text-white text-2xl hover:bg-blue-400"}
							onClick={() => {navigate("/cart")}}>Add to cart
						</button>
					</div>

					<button className={""} onClick={() => {navigate("/wishlist", { state: productData })}}>
						Add to wishlist
					</button>

					<div>
						<div>More details dropdown</div>

						<div>Quality assurance and returns</div>
					</div>

				</div>
			</div>

			<Reviews productData={productData} reviewAverage={reviewAverage}></Reviews>
		</div>
	)
}

export default Product