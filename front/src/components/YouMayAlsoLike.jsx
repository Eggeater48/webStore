import SingularProductFrame from "./SingularProductFrame.jsx";

const YouMayAlsoLike = ({products, reviewAverage, addToCart}) => {

	return (
		<div className={"flex flex-col gap-20"}>
			<div className={"text-4xl"}>
				You may also like
			</div>

			<div className={"flex flex-row gap-20 mb-28"}>
				{products.map(product =>
					<SingularProductFrame
						reviewAverage={reviewAverage}
						product={product}
						addToCart={addToCart}/>
				)}
			</div>

		</div>
	)
}

export default YouMayAlsoLike