import {useState} from "react";
import {useDispatch} from "react-redux";

const Reviews = ({ productData }) => {
	const [showForm, setShowForm] = useState(false)
	const dispatch = useDispatch() // Write a thunk for the productReducer that updates the data both on the mongo side and client side

	const theClick = () => {
		setShowForm(!showForm)
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		// send a put request to the backend
		// Sends the product but with the new review appended to product.reviews
	}

	// Input range feels kinda silly to use, but i guess it works for now
	// the rating has to look something like this
	// { rating : 1, date: iso8601 timestamp, reviewerName, reviewerEmail }

	return (
		<>
			{showForm &&
				<div>
					<div onClick={theClick}>Cancel writing</div>
					<input type={'range'} min={'1'} max={'5'} step={'1'} />

					<form onSubmit={onSubmit}>

					</form>
				</div>
			}

			{!showForm &&
				<div onClick={theClick}></div>
			}

			<div>
				{productData.reviews.map((review)=>
					<div>
						<div>{review.reviewerName}</div>
						<div>{review.rating}</div>
						<div>{review.date}</div>
					</div>
				)}
			</div>

		</>
	)
}

export default Reviews