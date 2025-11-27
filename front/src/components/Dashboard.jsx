import orderService from "../services/orderService.js";
import products from "../services/products.js";
import userService from "../services/userService.js";
import { useSelector } from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
	const user = useSelector(state => state.user)
	const navigate = useNavigate()
	const [orders, setOrders] = useState(null)

	useEffect(() => {
		if (!user) { // TODO add somehing smarter and better here cuz
			navigate('/login', { state: { pathname: "/dashboard" } })
		}
	}, [])

	useEffect(() => {
		const result = orderService.getAllOrders()
		setOrders(result)
	}, [])

	return (
		<div className={""}>
			<button
				className={""}
				onClick={() => {}}>
				Products
			</button>

			<button
				className={""}
				onClick={() => {}}>
				Users
			</button>

			<button
				className={""}
				onClick={() => {}}>
				Orders
			</button>
		</div>
	)
}

export default Dashboard