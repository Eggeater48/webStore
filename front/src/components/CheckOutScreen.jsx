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

	// Calculates the sum of items in the cart (no way!!)
	const sumOfItemInCart = location.state.reduce(
		(total, item) => total + item.price * item.count,
		0,
	).toFixed(2)

	// Calcs (slang for calculator) the total amount of items in the shopping cfart
	const totalItemsInCart = location.state.reduce(
		(totalCount, item) => totalCount + item.count,
		0
	)

	const onSubmit = async values => {
		const result = await userService.changeUser(user.id, values)
		setCurrentForm(true)
	}

	const onCardSubmit = async values => {
		window.alert("Purchase complete")
		console.log(values)
		await dispatch(clearCart())
		navigate("/")
	}

	// TODO change the product and total price location and look at some point
	return (
		<div>
			{!currentForm && <Form
				onSubmit={onSubmit}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit} className={"flex justify-center items-center flex-col align-middle mt-12"}>
						<div className={"flex flex-row justify-center items-center align-middle mt-12"}>
							{totalItemsInCart} {totalItemsInCart > 1 ? "products" : "product"}, {sumOfItemInCart} total
						</div>

						<div className={"rounded-md border-1 border-solid border-neutral-400"}>
							<div className={"flex flex-row gap-2 p-2"}>
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
										name={'address'}
										component={'input'}
										type={'text'}
										placeholder={'address..'}
										maxLength={'250'}
									/>
								</div>
							</div>

							<div className={"flex flex-row gap-2 p-2"}>
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
							</div>

							<div className={"flex flex-row gap-2 p-2"}>
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
							</div>
						</div>

						<button
							type={'submit'} disabled={submitting || pristine}
							className={'mt-4 bg-orange-500 rounded-md text-white font-bold w-52 h-14'}>
							Proceed to payment
						</button>

					</form>
				)}
			/>}

			{currentForm && <Form
				onSubmit={onCardSubmit}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form
						onSubmit={handleSubmit}
						className={"flex justify-center items-center flex-col align-middle"}>

						<div className={"flex flex-col justify-center w-full items-center align-middle mt-12"}>
							<div className={"rounded-md text-white bg-red-500 w-1/2 h-12 flex justify-center align-middle items-center"}>
								<div className={"relative"}>
									Not so secure checkout
								</div>
							</div>

							<div className={"flex flex-row justify-center items-center align-middle mt-6"}>
								{totalItemsInCart} {totalItemsInCart > 1 ? "products" : "product"}, {sumOfItemInCart} total
							</div>
						</div>

						<div className={"rounded-md border-1 border-solid border-neutral-400 m-5 p-5"}>
							<div className={""}>
								<div className={'flex flex-row gap-2 hover:border-neutral-300 hover:shadow-neutral-400'}>
									<Field
										name={'cardNumber'}
										component={'input'}
										type={'text'}
										placeholder={'Bank card number*'}
										maxLength={'250'}
										className={"w-full rounded-1xl p-2 border-1 border-solid border-neutral-200"}
									/>
								</div>
							</div>

							<div className={"flex flex-row mt-2"}>
								<div className={''}>
									<Field
										name={'expDate'}
										component={'input'}
										type={'text'}
										placeholder={'Expiration date*'}
										maxLength={'250'}
										className={"rounded-2xl p-2 border-1 border-solid border-neutral-200"}
									/>
								</div>

								<div className={''}>
									<Field
										name={'superSecretCode'}
										component={'input'}
										type={'text'}
										placeholder={'CVV/CVC*'}
										maxLength={'250'}
										className={"rounded-2xl p-2 border-1 border-solid border-neutral-200"}
									/>
								</div>

								<div className={''}>
									<Field
										name={'cardHolder'}
										component={'input'}
										type={'text'}
										placeholder={'Name on card*'}
										maxLength={'250'}
										className={"rounded-2xl p-2 border-1 border-solid border-neutral-200"}
									/>
								</div>
							</div>
						</div>

						<div className={"flex flex-col"}>
							<div className={"text-xs text-neutral-700 top-2 relative"}>
								I have read and agree to the <u>Privacy Policy</u>
							</div>

							<button
								type={'submit'} disabled={submitting || pristine}
								className={'rounded-md w-52 h-14 bg-blue-500 text-white font-bold mt-4'}>
								Proceed to payment
							</button>

						</div>


					</form>
				)}
			/>}


		</div>
	)
}

export default CheckOutScreen