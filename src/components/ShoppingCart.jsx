import {useDispatch, useSelector} from "react-redux";
import {removeItemFromCart} from "../reducers/shoppingCartReducer.js";

const ShoppingCart = () => {
	const dispatch = useDispatch()
	const shoppingCartItems = useSelector((state) => state.shoppingCart)

	// Maybe use useMemo here, seems like a good place to actually use that hook!!
	const prices = shoppingCartItems.map(product => // TBH i dont know if this one counts as an "expensive calculation"
		product.price
	).reduce((a, b) => a + b, 0)

	const onRemove = (id) => {
		dispatch(removeItemFromCart(id))
	}

	const onCheckout = () => {
		alert('Checkout has not been implemented yet 😨😨😨')
	}

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

							<button onClick={() => {onRemove(item.id)}}>Press me to remove this item from the cart!!</button>
						</div>
					)}
					<div>
						{shoppingCartItems.length} products, {prices} total
					</div>

					<button onClick={onCheckout}>
						Checkout
					</button>
				</div>
				:
				<div className={"animate-spin"}>
					The cart is empty...
				</div>
			}
		</div>
	)
}

export default ShoppingCart