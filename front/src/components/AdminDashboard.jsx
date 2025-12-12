import {useEffect, useState} from "react";
import userService from "../services/userService.js";
import products from "../services/products.js";
import {Form, Field} from "react-final-form";

// This whole thing should be in a separate react app to be honest..
const AdminDashboard = () => {
	const [users, setUsers] = useState([])
	const [products, setProducts] = useState([])

	useEffect(() => {
		const result = userService.getAllUsers()
		setUsers(result)
	}, [])

	useEffect(() => {
		const result = products.getAll()
		setProducts(result)
	})

	const blowUpThisGuy = async (userID) => {
		await userService.removeUser(userID)
	}

	const addNewProduct = async (productData) => {
		console.log(productData)
	}

	return (
		<div className={""}>
			<div className={"flex flex-col gap-4"}>
				<div className={""}>
					Users
				</div>

				<div className={"flex flex-row gap-4"}>
					{users.map(user =>
						<div className={""} key={user.id}>
							{user.id}
							{user.username}
							{user.name}
							{user.email}
							<button className={""} onClick={() => blowUpThisGuy(user.id)}>
								Just straight up delete this guy?
							</button>
						</div>
					)}
				</div>


			</div>

			<div className={"flex flex-col gap-4"}>
				<div className={""}>
					Products
				</div>
				{products.map(product =>
					<div className={""}>
						{product.title}
						{product.purchaseCount}
						<div className={"flex flex-row gap-3"}>
							<div className={""}>{product.stock}</div>

							<div className={"grid grid-cols-2"}>
								<button className={""} onClick={() => console.log(product.stock + 1)}>
									+
								</button>

								<button className={""} onClick={() => console.log(product.stock - 1)}>
									-
								</button>
							</div>

						</div>
					</div>
				)}
			</div>

			<div className={"flex flex-col gap-4"}>
				<div className={""}>
					Add a new product
				</div>

				<!-- This is gonna look so ugly!! esp with react final form  -->
				<Form onSubmit={addNewProduct} render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit}>
						<div className={''}>
							<Field
								name={'title'}
								component={'input'}
								type={'text'}
								placeholder={'Title..'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'description'}
								component={'input'}
								type={'text'}
								placeholder={'The description..'}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'category'}
								component={'input'}
								type={'text'}
								placeholder={''}
								maxLength={'250'}
							/>
						</div>

						<div className={''}>
							<Field
								name={'price'}
								component={'input'}
								type={'text'}
								placeholder={'Price'}
								maxLength={'250'}
							/>
						</div>

						Price
						DiscountPercentage
						Rating
						Stock
						tags [ "" ]
						sku
						weight
						dimensions {width, height, depth}
						warrantyInformation
						shippingInformation
						availabilityStatus
						returnPolicy
						images [ url here ]
						purchaseCount
					</form>
				)}
				/>

			</div>

		</div>
	)
}

export default AdminDashboard