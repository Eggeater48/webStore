import {useSelector, useDispatch} from "react-redux";

const ShoppingCart = () => {
	const dispatch = useDispatch()
	const shoppingCartItems = useSelector((state) => state.shoppingCart)

	return (
		<div>
			{shoppingCartItems.length ?
				<div>
					{shoppingCartItems.map(item =>
						<div>

						</div>
					)}
				</div>
				:
				<div>The cart is empty...</div>}
		</div>
	)
}

export default ShoppingCart