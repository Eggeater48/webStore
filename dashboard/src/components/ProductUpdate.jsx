import {Form} from "react-final-form";

const ProductUpdate = ({ product }) => {

	const theHandler = async (updatedProduct) => {
		console.log(updatedProduct)
	}

	return (
		<div className={""}>
			<Form onSubmit={theHandler} render={({ handleSubmit, form, submitting, pristine, values }) => (

			)}>

			</Form>
		</div>
	)
}

export default ProductUpdate