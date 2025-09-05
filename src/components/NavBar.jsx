import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigate = useNavigate()

	const onLogoPress = () => { // Just returns to the home page
		navigate('/')
	}

	const onShoppingCartPress = () => {
		navigate('/cart')
	}

	return ( // TODO maybe change this into a <nav> element (not sure what difference that has really)
		<div className={"relative flex flex-col border-b-black h-15 w-screen "}>
			<img
				alt={'Site logo'}
				src={'/src/assets/mowl.png'}
				className={"relative w-12 h-12"}
				onClick={onLogoPress}
			/>

			<button onClick={onShoppingCartPress} className={""}>
				Press me to open the shopping cart!!
			</button>

		</div>
	)
}

export default NavBar