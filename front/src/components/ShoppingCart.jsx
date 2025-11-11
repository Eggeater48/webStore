import {useDispatch, useSelector} from "react-redux";
import {removeItemFromCart} from "../reducers/shoppingCartReducer.js";
import {useLocation, useNavigate} from "react-router-dom";

const ShoppingCart = () => {
	const dispatch = useDispatch()
	const shoppingCartItems = useSelector((state) => state.shoppingCart)
	const user = useSelector(state => state.user)
	const navigate = useNavigate()
	const location = useLocation()

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
	)

	const totalItemsInCart = shoppingCartItems.reduce(
		(totalCount, item) => totalCount + item.count,
		0
	)
	// TODO The positioning is completely fucked up.. fix that asap!!
	return (
		<div>
			{shoppingCartItems.length ?
					<div className={"flex flex-row flex-wrap"}>
						{shoppingCartItems.map(item =>
							<div key={item.id} >
								<div>
									{item.title}
								</div>

								<div>
									€{item.price}
								</div>

								{item.count > 1 &&
									<div>
										{item.count}
									</div>}

								<button onClick={() => {onRemove(item.id)}}>
									Press me to remove this item from the cart!!
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