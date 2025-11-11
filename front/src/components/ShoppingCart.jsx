import {useDispatch, useSelector} from "react-redux";
import {removeItemFromCart} from "../reducers/shoppingCartReducer.js";
import {useLocation, useNavigate} from "react-router-dom";

const ShoppingCart = () => {
	const dispatch = useDispatch()
	const shoppingCartItems = useSelector((state) => state.shoppingCart)
	const user = useSelector(state => state.user)
	const navigate = useNavigate()
	const location = useLocation()

	// Could add something like user has a shoppingCart field which has id's which could then be populated to save a little bit of headache
	const onRemove = (id) => {
		dispatch(removeItemFromCart(id))
	}

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

	return (
		<div className={""}>
			{shoppingCartItems.length ?
					<div className={"flex flex-col flex-wrap gap-6"}>
						{shoppingCartItems.map(item =>
							<div className={"outline-neutral-500 outline-solid outline-1 w-80 h-32 grid grid-cols-3"} key={item.id} >
								<div className={""}>
									{item.title}
								</div>

								<div className={""}>
									€{item.price}
								</div>

								{item.count > 1 &&
									<div className={""}>
										{item.count}
									</div>}

								<button
									className={""}
									onClick={() => {onRemove(item.id)}}>
									<img
										className={""}
										src={"/src/assets/delete.svg"}
										alt={"remove from cart"} />
								</button>
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