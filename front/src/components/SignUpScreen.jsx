import { Form, Field } from 'react-final-form'
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux'
import userService from "../services/userService.js";
import { useState } from "react";

const SignUpScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [errorMessage, setErrorMessage] = useState(null)

	const handleSignUp = async (userDetails) => {
		const result = await userService.createNewUser(userDetails)

		if (result === undefined) {
			setTimeout(() => {
				setErrorMessage('Signup failed. Please try again.')
			}, 5000)
			setErrorMessage('null')
		} else { // TODO test this and then finish this implementation!
			dispatch(setUser(result))
			navigate('/')
		}
	}

	return (
		<Form
			onSubmit={handleSignUp}
			validate={values => {
				const errors = {}
				if (!values.username) {
					errors.username = 'Required'
				}
				if (!values.name) {
					errors.name = 'Required'
				}
				if (!values.email) {
					errors.email = 'Required'
				}
				if (!values.password) {
					errors.password = 'Required'
				}
			}}
			render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit} className={'flex justify-center items-center flex-col align-middle mt-12'}>
					{errorMessage &&
					<div className={''}>{errorMessage}</div>
					}

					<div className={''}>
						<Field
							name={'username'}
							component={'input'}
							type={'text'}
							placeholder={'Username'}
							className={"evil-border-outline-shadow"}
						/>
					</div>

					<div className={''}>
						<Field
							name={'name'}
							component={'input'}
							type={'text'}
							placeholder={'Name'}
							className={"mt-5 evil-border-outline-shadow"}
						/>
					</div>

					<div className={''}>
						<Field
							name={'email'}
							component={'input'}
							type={'text'}
							placeholder={'Email'}
							className={"mt-5 evil-border-outline-shadow"}
						/>
					</div>

					<div className={''}>
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
						className={''}
					>
						Submit the thing
					</button>

					<button onClick={() => navigate('/login')} type={'button'}>
						Log in
					</button>

				</form>
			)}
		/>
	)
}

export default SignUpScreen