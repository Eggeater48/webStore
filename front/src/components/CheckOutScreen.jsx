import {useLocation, useNavigate} from "react-router-dom";
import { Form, Field } from 'react-final-form'
import {useState} from "react";
import userService from "../services/userService.js";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../reducers/shoppingCartReducer.js";

// This part is held together by duct tape, hope and glue
// could be easily improved (probably) but its just such a pain in the ass
const CheckOutScreen = ({  }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [currentForm, setCurrentForm] = useState(false)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const sumOfItemInCart = location.state.reduce(
		(total, item) => total + item.price * item.count,
		0,
	)

	const totalItemsInCart = location.state.reduce(
		(totalCount, item) => totalCount + item.count,
		0
	)

	const onSubmit = async values => {
		const result = await userService.changeUser(user.id, values)
		console.log(result)
		setCurrentForm(true)
	}

	const onCardSubmit = async values => {
		window.alert("Purchase complete")
		console.log(values)
		await dispatch(clearCart())
		navigate("/")
	}

	return (
		<div>
			<div className={"rounded-md text-white bg-red-500 text-center"}>
				Not so secure Checkout
			</div>
			<div className={"flex flex-col"}>
				{location.state.map((product) =>
					<div className={""}>
						{product.title} €{product.price * product.count} {product.count}
					</div>
				)}
			</div>

			<div className={"flex flex-row"}>
				{sumOfItemInCart} {totalItemsInCart}
			</div>

			{!currentForm && <Form
				onSubmit={onSubmit}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<div className={''}>
							<Field
								name={'country'}
								component={'input'}
								type={'text'}
								placeholder={'Country...'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'firstName'}
								component={'input'}
								type={'text'}
								placeholder={'First name...'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'lastName'}
								component={'input'}
								type={'text'}
								placeholder={'Last name...'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'address'}
								component={'input'}
								type={'text'}
								placeholder={'address..'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'stateProvince'}
								component={'input'}
								type={'text'}
								placeholder={'State / Province..'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'city'}
								component={'input'}
								type={'text'}
								placeholder={'City...'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'zipCode'}
								component={'input'}
								type={'text'}
								placeholder={'Zip code...'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'phoneNumber'}
								component={'input'}
								type={'text'}
								placeholder={'Phone number...'}
								maxLength={'250'}
							/>
						</div>



						<button
							type={'submit'} disabled={submitting || pristine}
							className={''}
						>
							Submit the thing
						</button>

						<button
							type={"button"}
							onClick={form.reset}
							disabled={submitting || pristine}
							className={''}
						>
							I reset the form!!
						</button>

					</form>
				)}
			/>}

			{currentForm && <Form
				onSubmit={onCardSubmit}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<div className={''}>
							<Field
								name={'cardNumber'}
								component={'input'}
								type={'text'}
								placeholder={'1234 5678 9012 3456'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'expDate'}
								component={'input'}
								type={'text'}
								placeholder={'MM/YY'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'superSecretCode'}
								component={'input'}
								type={'text'}
								placeholder={'123'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'cardHolder'}
								component={'input'}
								type={'text'}
								placeholder={'John Doe'}
								maxLength={'250'}
							/>
						</div>

						<button
							type={'submit'} disabled={submitting || pristine}
							className={''}
						>
							Submit the thing
						</button>

						<button
							type={"button"}
							onClick={form.reset}
							disabled={submitting || pristine}
							className={''}
						>
							I reset the form!!
						</button>

					</form>
				)}
			/>}


		</div>
	)
}

export default CheckOutScreen