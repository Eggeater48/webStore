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
		const result = dispatch(updateCart(newProduct))
		console.log(result)
	}

	const removeFromCart = async (id) => {
		const result = dispatch(removeItemFromCart(id))
		console.log(result)
	}

	return (
		<div className={""}>
			{shoppingCartItems.length ?
					<div className={"flex flex-col flex-wrap gap-6"}>
						{shoppingCartItems.map(product =>
							<div className={"w-3/4 outline-gray-300 h-48 outline-1 outline-solid grid grid-cols-3"}>
								<img
									className={"h-1/2 w-3/4 outline-1 outline-gray-300 outline-solid rounded-md self-center justify-self-center"}
									src={product.thumbnail}
									alt={product.title}/>

								<div className={"flex flex-col gap-3 justify-self-center"}>
									<div className={""}>
										{product.title}
									</div>
								</div>

								<div className={"flex flex-row gap-4 self-center justify-self-center"}>
									<div className={""}>
										€{product.price}
									</div>

									<div className={"grid grid-cols-3 h-12 w-24 outline-1 outline-solid outline-gray-400 rounded-md"}>
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
												className={"text-center rounded-full w-4 h-4 "}
												onClick={() => changeProductInCart({...product, count: product.count - 1})}>
												-
											</button>
										}

										<div className={"text-center"}>
											{product.count}
										</div>

										<button
											className={"text-center "}
											onClick={() => changeProductInCart({...product, count: product.count + 1})}>
											+
										</button>

									</div>

								</div>

							</div>
						)}

						<div className={"border-neutral-300 border-1 rounded-md"}>
							<div className={"flex flex-row gap-3"}>
								<div className={""}>
									{totalItemsInCart} products
								</div>

								<div className={""}>
									{sumOfItemInCart} total
								</div>
							</div>

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