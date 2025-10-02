import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigate = useNavigate()

	return ( // TODO fix the positioning on this.. its really bad at the moment!!
		<div className={"relative flex flex-col border-b-black h-15 w-screen "}>
			<img
				alt={'Site logo'}
				src={'/src/assets/mowl.png'}
				className={"relative w-12 h-12 animate-bounce"}
				onClick={() => navigate('/')}
			/>

			<div className={"w-60 h-10 outline-1 outline-gray-400"}>
				<img
					alt={"Search logo"}
					src={"/src/assets/search_thing.png"}
					className={"relative w-5 h-5 animate-bounce"}
				/>
				<input type={"text"} onChange={() => console.log('ello')} />
			</div>

			<button onClick={() => navigate('/cart')} className={"animate-bounce"}>
				Press me to open the shopping cart!!
			</button>

		</div>
	)
}

export default NavBar