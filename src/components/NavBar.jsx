import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigate = useNavigate()

	return ( // TODO maybe change this into a <nav> element 
		<div className={"relative flex flex-col border-b-black h-15 w-screen "}>
			<img
				alt={'Site logo'}
				src={'/src/assets/mowl.png'}
				className={"relative w-12 h-12 animate-bounce"}
				onClick={() => navigate('/')}
			/>

			<button onClick={() => navigate('/cart')} className={"animate-bounce"}>
				Press me to open the shopping cart!!
			</button>

		</div>
	)
}

export default NavBar