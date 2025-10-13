import { Form, Field } from 'react-final-form'
import {useNavigate} from "react-router-dom";

const SignUpScreen = () => {
	const navigate = useNavigate()

	const handleSignUp = (userDetails) => {
		console.log(userDetails)
	}

	return (
		<Form
			onSubmit={handleSignUp}
			render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit} className={'flex justify-center items-center flex-col align-middle'}>
					<div className={''}>
						<Field
							name={'username'}
							component={'input'}
							type={'text'}
							placeholder={'Username'}
						/>
					</div>

					<div className={''}>
						<Field
							name={'email'}
							component={'input'}
							type={'text'}
							placeholder={'Email'}
						/>
					</div>

					<div className={''}>
						<Field
							name={''}
							component={'input'}
							type={'password'}
							placeholder={'Password'}
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