import {useSelector, useDispatch} from "react-redux";
import {removeItemFromCart} from "../reducers/shoppingCartReducer.js";

const ShoppingCart = () => {
	const dispatch = useDispatch()
	const shoppingCartItems = useSelector((state) => state.shoppingCart)

	const onRemove = (id) => {
		dispatch(removeItemFromCart(id))
	}

	return (
		<div>
			{shoppingCartItems.length ?
				<div>
					{shoppingCartItems.map(item =>
						<div key={item.id} className={""}>
							<div>{item.title}</div>
							<div>{item.price}</div>

							<button onClick={() => {onRemove(item.id)}}>Press me to remove this item from the cart!!</button>
						</div>
					)}
				</div>
				:
				<div>
					The cart is empty...
				</div>
			}
		</div>
	)
}

export default ShoppingCart