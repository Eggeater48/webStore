import {useNavigate} from "react-router-dom";

const TheChoice = () => {
	const navigate = useNavigate()

	return (
		<div className={"flex flex-row gap-6"}>
			<div className={""} onClick={() => navigate('/users')}>
				Users
			</div>

			<div className={""} onClick={() => navigate('/products')}>
				Products
			</div>

			<div className={""} onClick={() => navigate('/orders')}>
				Orders
			</div>
		</div>
	)
}

export default TheChoice