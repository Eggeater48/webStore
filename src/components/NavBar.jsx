import { Link } from "react-router"

const NavBar = () => {
	return ( // TODO maybe change this into a <nav> element (not sure what difference that has really)
		<div className={"relative grid border-b-black h-15 w-screen "}>

			<div >
				Im supposed to be the site logo!!
			</div>

			<div className={"relative h-7 w-15 bg-gray-100 "}>
				Im a searchBar (in the future!!)
			</div>

			<div>
				Im the login button!!
			</div>

			<div>
				Im the shopping cart!!
			</div>

		</div>
	)
}

export default NavBar