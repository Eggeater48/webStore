import {useDispatch, useSelector} from "react-redux";
import {removeItemFromCart} from "../reducers/shoppingCartReducer.js";
import {useNavigate} from "react-router-dom";

const ShoppingCart = () => {
	const dispatch = useDispatch()
	const shoppingCartItems = useSelector((state) => state.shoppingCart)
	const navigate = useNavigate()

	const onRemove = (id) => {
		dispatch(removeItemFromCart(id))
	}

	const onCheckout = () => {
		alert('Checkout has not been implemented yet 😨😨😨')
	}

	const sumOfItemInCart = shoppingCartItems.reduce(
		(total, item) => total + item.price * item.count,
		0,
	)

	const totalItemsInCart = shoppingCartItems.reduce(
		(totalCount, item) => totalCount + item.count,
		0
	)

	return (
		<div>
			{shoppingCartItems.length ?
				<div>
					{shoppingCartItems.map(item =>
						<div key={item.id} className={""}>
							<div>{item.title}</div>

							<div>{item.price}</div>
							{item.count > 1 &&
								<div>
									{item.count}
								</div>}

							<button onClick={() => {onRemove(item.id)}}>
								Press me to remove this item from the cart!!
							</button>
						</div>
					)}
					<div>
						{totalItemsInCart} products, {sumOfItemInCart} total
					</div>

					<button onClick={onCheckout}>
						Checkout
					</button>
				</div>
				:
				<div className={""}>
					<div className={""}>
						THE CART IS EMPTY...
					</div>

					<button onClick={() => {navigate("/")}}>
						START SHOPPING
					</button>
				</div>
			}
		</div>
	)
}

export default ShoppingCart