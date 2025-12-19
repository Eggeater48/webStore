import {Form, Field} from 'react-final-form'
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const ProductAddNew = ({ productData }) => {
	const navigate = useNavigate()
	const [tags, setTags] = useState([])

	const submitHandler = newProduct => {
		console.log(newProduct)
	}

	return (
		<div className={""}>
			<button className={""} onClick={() => navigate('/products')}></button>

			<Form onSubmit={submitHandler} render={({ handleSubmit, form, submitting, pristine, values  }) => (
				<form onSubmit={handleSubmit}>

					<div className={""}>
						<Field
							name={'title'}
							component={"input"}
							type={'text'}
							placeholder={'The Title'}
							maxLength={'250'}
						/>
					</div>

					<div className={""}>
						<Field
							name={'description'}
							component={'input'}
							type={'text'}
							placeholder={'The Description'}
							maxLength={'250'}
						/>
					</div>

					<div className={""}>
						<Field
							name={'price'}
							component={'input'}
							type={'text'}
							placeholder={'The Price'}
							maxLength={'250'}
						/>
					</div>

					<div className={""}>
						<Field
							name={'discountPercentage'}
							component={'input'}
							type={'text'}
							placeholder={'The Discount Percentage'}
							maxLength={'250'}
						/>
					</div>

					<div className={""}>
						<Field
							name={'stock'}
							component={'input'}
							type={'text'}
							placeholder={'How much of the product is in stock?'}
							maxLength={'250'}
						/>
					</div>

					<div className={"flex flex-col gap-2"}>
						<div className={""}>
							Product Tags!!
						</div>

						<button className={""} onClick={() => }>

						</button>

					</div>

				</form>
			)}/>
		</div>
	)
}

export default ProductAddNew