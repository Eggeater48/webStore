import { Form, Field } from 'react-final-form'
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import userService from '../services/userService';
import { useState } from "react";
import {setUser} from "../reducers/userReducer.js";

const LoginScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()
	const [errorMessage, setErrorMessage] = useState(null)

	const handleLogin = async (userDetails) => {
		const result = await userService.login(userDetails)
		if (result === undefined) {
			setTimeout(() => {
				setErrorMessage('Login failed. Please try again.')
			}, 5000)
			setErrorMessage(null)
		} else {
			dispatch(setUser(result))

			if (location.state) {
				navigate(location.state.pathname)
			} else {
				navigate('/')
			}
		}
	}
	// The login failure message takes quite a bit to arrive for some reason. could use fixing maybe perhaps perchance
	return (
		<Form
			onSubmit={handleLogin}
			render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form
					onSubmit={handleSubmit}
					className={'flex justify-center items-center flex-col align-middle mt-12'}>
					{errorMessage &&
					<div className={'text-red-500'}>{errorMessage}</div>
					}
					
					<div>
						<Field
							name={'username'}
							component={'input'}
							type={'text'}
							placeholder={'Username'}
							className={"evil-border-outline-shadow"}
						/>
					</div>

					<div>
						<Field
							name={'password'}
							component={'input'}
							type={'password'}
							placeholder={'Password'}
							className={"mt-5 evil-border-outline-shadow"}
						/>
					</div>

					<button
						type={'submit'} disabled={submitting || pristine}
						className={'mt-5'}
					>
						Submit the deets
					</button>

					<button className={''} onClick={() => navigate('/signup')} type={'button'}>
						Signup instead...
					</button>
				</form>
			)}
		/>
	)
}

export default LoginScreen