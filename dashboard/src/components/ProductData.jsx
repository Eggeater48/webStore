import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ProductData = () => {
	const products = useSelector(state => state.products)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initialProducts()) // from this projects instead of the
	}, [])

	return (
		<div className={""}>
			<button className={""} onClick={() => navigate('/')}>
				Go back
			</button>

			<div className={""}>
				{products.map(product =>
					<div className={""} key={product.id}>
						<div className={""}>
							{product.title}
							{product.purchaseCount}
							{product.id}
						</div>

						<button className={""} onClick={() => navigate('/products/')}>
							Modify this product?
						</button>

						<button className={""} onClick={}>
							Delete this product?
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductData