import {useLocation, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
	const navigate = useNavigate()
	const user = useSelector((state) => state.user)
	const shoppingCart = useSelector((state) => state.shoppingCart)
	// This could also be just passed as state

	const onWishList = () => {
		if (!user) {
			navigate("/login", { state: { pathname: "/wishlist" } })
		} else {
			navigate("/wishlist")
		}
	}

	// The shopping cart length thing is kinda weird.. Could and should try improving it later
	return (
		<div className={"absolute top-0 left-0 w-screen flex flex-row justify-around border-b-black h-15 align-middle text-center"}>
			<img
				alt={'Site logo'}
				src={'/src/assets/mowl.png'}
				className={"relative w-12 h-12 animate-bounce cursor-pointer"}
				onClick={() => navigate('/')}
			/>

			<button className={"h-15 relative hover:text-zinc-500 cursor-pointer"} onClick={() => {navigate('/')}}>
				Home
			</button>

			<div className={"flex flex-row gap-2"}>
				<button onClick={() => navigate('/cart')} className={"cursor-pointer h-15 relative hover:text-zinc-500"}>
					Shopping cart {shoppingCart.length > 0 && `(${shoppingCart.length})`}
				</button>

				<button onClick={onWishList} className={"cursor-pointer h-15 relative hover:text-zinc-500"}>
					Wishlist
				</button>

				<button onClick={() => navigate('/dashboard')} className={"cursor-pointer h-15 relative hover:text-zinc-500"}>
					Account
				</button>
			</div>

		</div>
	)
}

export default NavBar