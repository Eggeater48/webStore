import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {initialProducts} from "../reducers/productReducer.js";
import {useDispatch, useSelector} from "react-redux";

const Products = ({ reviewAverage, addToCart, totalReviews, addToWishlist }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.products)

	useEffect(() => {
		dispatch(initialProducts())
	}, [dispatch])

	const onSelect = (product) => {
		navigate(`/${product.id}`)
	}
 	// TODO actually animate the bar color switching and mby make it smaller
	return (

		<div className={"flex flex-row flex-wrap gap-20 mt-24"}>
			{productList.map(product =>
				<div className={"group cursor-pointer"}>
					<div key={product.id} className={"w-52 h-80"}>
						<div className={"h-60 w-52 outline-1 outline-solid outline-neutral-500 rounded-md overflow-hidden"}>
							<div onClick={() => {onSelect(product)}}>
								<img
									src={product.thumbnail}
									alt={product.title}
									className={"relative w-auto h-auto align-middle "}
								/>
							</div>
						</div>

						<div className={""}>
							<div className={"text-pretty"}>
								{product.title}
							</div>

							<div className={""}>
								€{product.price}
							</div>
						</div>
					</div>
					<div className={"bg-black w-52 h-0.5 relative top-5 group-hover:bg-blue-400"}></div>
				</div>
			)}
		</div>
	)
}


export default Products