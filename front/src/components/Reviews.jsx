import {useState} from "react";
import {useDispatch} from "react-redux";
import { Form, Field } from 'react-final-form'
//import {addNewReview} from "../reducers/productReducer.js";

const Reviews = ({ productData }) => {
	const [showForm, setShowForm] = useState(false)
	const dispatch = useDispatch() // Write a thunk for the productReducer that updates the data both on the mongo side and client side

	const theClick = () => {
		setShowForm(!showForm)
	}

	const onSubmit = async values => {
		console.log(values) // TODO should also send the currently logged in users name and email aswell!!
		// For future reference values are rating and comment right now!!
		//dispatch(addNewReview())
	}

	return (
		<>
			{showForm &&
				<Form
					onSubmit={onSubmit}
					render={({ handleSubmit, form, submitting, pristine, values }) => (
						<form onSubmit={handleSubmit}>
							<div className={''}>
								<label>Rating</label>
								<Field
									name={'rating'}
									component={'input'}
									type={'range'}
									min={'1'}
									max={'5'}
									step={'1'}
									defaultValue={'3'}
								/>
							</div>

							<div className={''}>
								<Field
									name={'comment'}
									component={'input'}
									type={'text'}
									placeholder={''}
									maxLength={'250'}
								/>
							</div>

							<button
								type={'submit'} disabled={submitting || pristine}
								className={''}
							>
								Submit the thing
							</button>

							<button
								type={"button"}
								onClick={form.reset}
								disabled={submitting || pristine}
								className={''}
							>
								I reset the form!!
							</button>

						</form>
					)}
				/>
			}

			{!showForm &&
				<div onClick={theClick}>Write a review</div>
			}

			<div>
				{productData.reviews.map((review)=>
					<div className={'flex w-60 h-48 outline-1 outline-solid'}>
						<div>
							{review.reviewerName}
						</div>

						<div>
							{review.rating}
						</div>

						<div>
							{review.date}
						</div>
					</div>
				)}
			</div>

		</>
	)
}

export default Reviews