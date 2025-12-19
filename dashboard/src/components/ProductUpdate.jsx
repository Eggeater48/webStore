import {Form, Field} from "react-final-form";

const ProductUpdate = ({ product }) => {

	const theHandler = async (updatedProduct) => {
		console.log(updatedProduct)
	}

	return (
		<div className={""}>
			<Form
				onSubmit={theHandler}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit} className={""}>
					<div className={""}>
						<Field
							name={'title'}
							component={"input"}
							type={'text'}
							placeholdeer={product.title}
							maxLength={'250'}
						/>
					</div>

					<div className={""}>
						<Field
							name={'description'}
							component={"input"}
							type={'text'}
							placeholdeer={product.description}
							maxLength={'250'}
						/>
					</div>

					<div className={""}>
						<Field
							name={'category'}
							component={"input"}
							type={'text'}
							placeholdeer={product.category}
							maxLength={'250'}
						/>
					</div>

					<div className={""}>
						<Field
							name={'price'}
							component={"input"}
							type={'text'}
							placeholdeer={product.price}
							maxLength={'250'}
						/>
					</div>

					<div className={""}>
						<Field
							name={'discountPercentage'}
							component={"input"}
							type={'text'}
							placeholdeer={product.discountPercentage}
							maxLength={'250'}
						/>
					</div>

					<div className={""}>
						{product.tags.length > 0 &&
							<div className={"flex flex-col gap-1"}>
								{product.tags.map(tag =>
									<div className={"flex flex-row"}>
										{tag}
										<button className={""} onClick={() => console.log(tag)}>
											Remove tag
										</button>
									</div>
								)}
							</div>
						}
					</div>

					<div className={""}>
						<Field
							name={'weight'}
							component={"input"}
							type={'text'}
							placeholdeer={product.weight}
							maxLength={'250'}
						/>
					</div>

					<div className={""}>
						<div className={""}>
							Dimensions
						</div>

						<div className={""}>
							<Field
								name={'width'}
								component={"input"}
								type={'text'}
								placeholdeer={product.dimensions.width}
								maxLength={'250'}
							/>
						</div>

						<div className={""}>
							<Field
								name={'height'}
								component={"input"}
								type={'text'}
								placeholdeer={product.dimensions.height}
								maxLength={'250'}
							/>
						</div>

						<div className={""}>
							<Field
								name={'depth'}
								component={"input"}
								type={'text'}
								placeholdeer={product.dimensions.depth}
								maxLength={'250'}
							/>
						</div>

					</div>

					<div className={"flex flex-col gap-4"}>
						<div className={""}>

						</div>

						<div className={""}>
							<Field
								name={'warrantyInformation'}
								component={"input"}
								type={'text'}
								placeholdeer={product.warrantyInformation}
								maxLength={'250'}
							/>
						</div>

						<div className={""}>
							<Field
								name={'shippingInformation'}
								component={"input"}
								type={'text'}
								placeholdeer={product.shippingInformation}
								maxLength={'250'}
							/>
						</div>
					</div>

					<div className={""}>
						<Field
							name={'minimumOrderQuantity'}
							component={"input"}
							type={'text'}
							placeholdeer={product.minimumOrderQuantity}
							maxLength={'250'}
						/>
					</div>

					<button
						className={""}
						type={'submit'}
						disabled={submitting || pristine}>
						Submit changes
					</button>

					<button
						className={""}
						type={'reset'}
						onClick={form.reset}
						disabled={submitting || pristine}>
						Reset
					</button>
				</form>
			)}>

			</Form>
		</div>
	)
}

export default ProductUpdate