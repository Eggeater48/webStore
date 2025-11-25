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
		if (!user) {
			navigate('/login', { state: { pathname: "/dashboard" } })
		}
	}, [])

	useEffect(() => {
		const result = orderService.getAllOrders()
		setOrders(result)
	}, [])

	return (
		<div className={""}>
			<div className={""}>
				Products section
			</div>

			<div className={""}>
				User handling section
			</div>

			<div className={""}>
				Order handling
			</div>
		</div>
	)
}

export default Dashboard