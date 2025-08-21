const Product = ({ productData }) => {
	//TODO make a function that calculates the average of the products reviews

	const addToCart = (event) => {
		event.preventDefault()
	}

	return ( // className={"relative h-32 w-32"}
		<div>
			<div className={"relative w-40 h-40"}>
				<img src={productData.images[0]} alt={productData.title} />
			</div>

			<div>
				{productData.title}
			</div>

			<div>
				TODO review avg
			</div>

			<div>
				{productData.price}
			</div>

			<div onClick={addToCart}>
				<img src={"/assets/shopping_cart_add.png"} alt={'atc'} />
			</div>

		</div>
	)
}

export default Product