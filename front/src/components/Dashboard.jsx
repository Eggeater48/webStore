import orderService from "../services/orderService.js";
import products from "../services/products.js";
import userService from "../services/userService.js";
import { useSelector } from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { Field, Form } from "react-final-form"

const Dashboard = () => {
	const user = useSelector(state => state.user)
	const products = useSelector(state => state.user)
	const navigate = useNavigate()
	const [orders, setOrders] = useState(null)
	const [whatsShown, setWhatsShown] = useState(null)

	useEffect(() => {
		if (!user) { // TODO add somehing smarter and better here cuz
			navigate('/login', { state: { pathname: "/dashboard" } })
		}
	}, [])

	useEffect(() => {
		const result = orderService.getUserOrderHistory(user.id)
		setOrders(result)
	}, [])

	const updateUserInfo = (update) => {
		console.log(update)
	}

	// TODO maybe change the "shipping address" form fields around a little or position them in a cool way
	return (
		<div className={""}>
			<div className={"flex flex-col gap-4"}>
				<div className={""}>
					Personal Information
				</div>

				<Form onSubmit={updateUserInfo} render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<div className={""}>
							<label>Username</label>
							<Field
								name={'username'}
								component={'input'}
								type={'text'}
								placeholder={user.username}
							/>
						</div>

						<div className={""}>
							<label>Name</label>
							<Field
								name={'name'}
								component={'input'}
								type={'text'}
								placeholder={user.name}
							/>
						</div>

						<div className={""}>
							<label>Email</label>
							<Field
								name={'email'}
								component={'input'}
								type={'text'}
								placeholder={user.email}/>
						</div>

						<div className={""}>
							<label>Phone number</label>
							<Field
								name={'phoneNumber'}
								component={'input'}
								type={'text'}
								placeholder={user.phoneNumber}/>
						</div>

						<div className={""}>
							<label>Birthday</label>
							<Field
								name={"birthday"}
								component={"input"}
								type={"text"}
								placeholder={user.birthday}
							/>
						</div>

						<button className={""} type={'submit'} disabled={submitting || pristine}>
							Save
						</button>
					</form>
				)}
				/>
			</div>

			<div className={"flex flex-col gap-4"}>
				<div className={""}>
					Shipping details
				</div>

				<div className={"flex flex-col gap-4"}>
					<Form onSubmit={updateUserInfo} render={({ handleSubmit, submitting, pristine }) => (
						<form onSubmit={handleSubmit}>
							<div>
								<label>Shipping Address</label>
								<Field
									name={"address"}
									component={"input"}
									type={"text"}
									placeholder={user.addressSettings.address}
								/>
							</div>

							<div>
								<label>Zipcode</label>
								<Field
									name={"zipCode"}
									component={"input"}
									type={"text"}
									placeholder={user.addressSettings.zipCode}
								/>
							</div>

							<div>
								<label>City</label>
								<Field
									name={"city"}
									component={"input"}
									type={"text"}
									placeholder={user.addressSettings.city}
								/>
							</div>

							<div>
								<label>Country</label>
								<Field
									name={"country"}
									component={"input"}
									type={"text"}
									placeholder={user.addressSettings.country}
								/>
							</div>

							<div>
								<label>State province</label>
								<Field
									name={"stateProvince"}
									component={"input"}
									type={"text"}
									placeholder={user.addressSettings.stateProvince}
								/>
							</div>

							<button className={""} type={'submit'} disabled={submitting || pristine}>
								Save
							</button>
						</form>
					)}
					/>
				</div>

			</div>

			<div className={""}>
				{orders.map(order =>
					<div key={order.id} className={""}>
						<div>{order.status}</div>
						<div>{order.createdAt}</div>
					</div>
				)}
			</div>

		</div>
	)
}

export default Dashboard