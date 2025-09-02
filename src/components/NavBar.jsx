import { Link } from "react-router"
import { useNavigate } from "react-router-dom";

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

			<button className={""}>
				Press me to open the shopping cart!!
			</button>

		</div>
	)
}

export default NavBar