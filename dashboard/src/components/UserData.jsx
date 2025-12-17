import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAndSetUsers} from "../reducers/userReducer.js";
import {useNavigate} from "react-router-dom";
import userService from "../services/userService.js";

const UserData = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const users = useSelector(state => state.users)

	useEffect(() => {
		dispatch(getAndSetUsers())
	}, [])

	const blowUpThisGuy = async (userID) => {
		await userService.removeUser(userID)
	}

	return (
		<div className={""}>
			<button className={""} onClick={() => navigate('/')}>
				Go back!!
			</button>

			<div className={""}>
				{users.map(user =>
					<div className={""} key={user.id}>
						<div className={""}>
							{user.id}
							{user.username}
							{user.name}
							{user.email}
						</div>

						<button className={""} onClick={() => blowUpThisGuy(user.id)}>
							Just straight up blow up this guy??
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default UserData