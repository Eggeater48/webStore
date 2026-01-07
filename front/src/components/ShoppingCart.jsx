import {useDispatch, useSelector} from "react-redux";
import {removeItemFromCart, updateCart} from "../reducers/shoppingCartReducer.js";
import {useLocation, useNavigate} from "react-router-dom";

const ShoppingCart = () => {
	const dispatch = useDispatch()
	const shoppingCartItems = useSelector((state) => state.shoppingCart)
	const user = useSelector(state => state.user)
	const navigate = useNavigate()
	const location = useLocation()

	const onCheckout = () => {
		if (!user) {
			navigate("/login", { state: location })
		} else {
			navigate("/checkout", { state: shoppingCartItems })
		}
	}

	const sumOfItemInCart = shoppingCartItems.reduce(
		(total, item) => total + item.price * item.count,
		0,
	).toFixed(2) // TODO round this numbers second decimal properly and maybe find a smarter way to handle this

	const totalItemsInCart = shoppingCartItems.reduce(
		(totalCount, item) => totalCount + item.count,
		0
	)

	const changeProductInCart = async (newProduct) => {
		dispatch(updateCart(newProduct))
	}

	const removeFromCart = async (id) => {
		dispatch(removeItemFromCart(id))
	}

	return (
		<div className={"mt-12"}>
			{shoppingCartItems.length ?
					<div className={"flex flex-col flex-wrap gap-6"}>
						{shoppingCartItems.map(product =>
							<div className={""}>
								<div className={""}>
									<img className={"w-20 h-20"} src={product.thumbnail} alt={product.title} />
								</div>

								<div className={""}>
									{product.title}
								</div>

								<div className={""}>
									{product.availabilityStatus}
								</div>

								<div className={""}>
									{product.price}
								</div>


								<div
									className={"flex flex-row justify-evenly h-12 w-24 outline-1 outline-solid outline-gray-400 rounded-md items-center align-middle"}>
									{product.count === 1 ?
										<button
											onClick={() => removeFromCart(product.id)}
											className={""}>
											<img
												className={"rounded-full w-4 h-4"}
												src={"/src/assets/delete.svg"}
												alt={"Remove from wishlist"}/>
										</button>
										:
										<button
											className={"text-center rounded-full w-4 h-4"}
											onClick={() => changeProductInCart({...product, count: product.count - 1})}>
											-
										</button>
									}

									<div className={"text-center relative "}>
										{product.count}
									</div>

									<button
										className={"text-center "}
										onClick={() => changeProductInCart({...product, count: product.count + 1})}>
										+
									</button>

								</div>
							</div>
						)}

						<div className={"w-full border-black border-t-1 "}>
							<div className={"flex gap-1 flex-row-reverse"}>
								<div className={""}>
									{sumOfItemInCart} total
								</div>

								<div className={""}>
									{totalItemsInCart} {totalItemsInCart > 1 ? "products" : "product"},
								</div>
							</div>
						</div>

						<div className={""}>
							<button
								className={"bg-orange-500 rounded-md text-white w-72 h-12 text-2xl font-bold cursor-pointer"}
								onClick={onCheckout}>
								Check out
							</button>
						</div>
					</div>
				:
				<div className={"flex flex-col flex-wrap"}>
					<div className={""}>
						THE CART IS EMPTY...
					</div>

					<button className={""} onClick={() => {navigate("/")}}>
						START SHOPPING
					</button>
				</div>
			}
		</div>
	)
}

export default ShoppingCart