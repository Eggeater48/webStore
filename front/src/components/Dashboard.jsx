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
	const [whatsShown, setWhatsShown] = useState(null)

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
			<div className={"flex flex-col gap-4"}>
				<input
					type={"radio"}
					className={"dashboard-button "}
					value={"users"}
					onChange={({target}) => setWhatsShown(target.value)}
					id={"users"}
				/>
				<label htmlFor={""} className={""}>

				</label>

				<input
					type={"radio"}
					className={"dashboard-button "}
					value={"products"}
					onChange={({target}) => setWhatsShown(target.value)}
					id={"products"}
				/>
				<label htmlFor={""} className={""}>

				</label>

				<input
					type={"radio"}
					className={"dashboard-button "}
					value={"orders"}
					onChange={({target}) => setWhatsShown(target.value)}
					id={"orders"}
				/>
				<label htmlFor={""} className={""}>

				</label>
			</div>
		</div>
	)
}

export default Dashboard