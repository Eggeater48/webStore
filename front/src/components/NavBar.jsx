import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
	const navigate = useNavigate()
	const user = useSelector((state) => state.user)
	// The user ball element thing could have a dropdown menu when the user is logged in...

	return ( // TODO fix the positioning on this.. its really bad at the moment!!
		<div className={"relative flex flex-row border-b-black h-15 w-screen "}>
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

			<button onClick={() => navigate('/cart')} className={"top-0"}>
				Press me to open the shopping cart!!
			</button>

			{user ? 
				<div className={""} onClick={() => navigate('/wishlist')}>
					Yo
				</div>
			 :
				<button onClick={() => navigate('/login')} className={"top-0"}>
					<img 
						alt={"Login"}
						src={"/src/assets/login_icon.png"}
						className={""}
					/>
				</button>
			}
		</div>
	)
}

export default NavBar