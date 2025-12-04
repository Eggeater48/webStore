import { useSelector } from "react-redux";

const ProductManagement = () => {
	const products = useSelector(state => state.products)

	return (
		<div className={""}>
			<div className={""}>
				{products.map(product =>
					<div key={product.id} className={""}>

					</div>
				)}
			</div>
		</div>
	)
}

export default ProductManagement