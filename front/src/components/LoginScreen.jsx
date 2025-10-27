import { Form, Field } from 'react-final-form'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {handierLoginHandler} from "../reducers/userReducer.js";

const LoginScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogin = (userDetails) => {
		dispatch(handierLoginHandler(userDetails))
	}

	return (
		<Form
			onSubmit={handleLogin}
			render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit} className={'flex justify-center items-center flex-col align-middle'}>
					<div>
						<Field
							name={'username'}
							component={'input'}
							type={'text'}
							placeholder={'Username'}
						/>
					</div>

					<div>
						<Field
							name={'password'}
							component={'input'}
							type={'password'}
							placeholder={'Password'}
						/>
					</div>

					<button
						type={'submit'} disabled={submitting || pristine}
						className={''}
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