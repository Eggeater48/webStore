import {useEffect, useState} from "react";
import userService from "../services/userService.js";
import products from "../services/products.js";
import {Form, Field} from "react-final-form";
import AdminDashboardNewProduct from "./AdminDashboardNewProduct.jsx";

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

			<AdminDashboardNewProduct addNewProduct={addNewProduct} />

		</div>
	)
}

export default AdminDashboard