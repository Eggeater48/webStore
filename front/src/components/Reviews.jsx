import {useState} from "react";
import {useDispatch} from "react-redux";
import { Form, Field } from 'react-final-form'
//import {addNewReview} from "../reducers/productReducer.js";

const Reviews = ({ productData, reviewAverage }) => {
	const [showForm, setShowForm] = useState(false)
	const dispatch = useDispatch() // Write a thunk for the productReducer that updates the data both on the mongo side and client side

	return (
		<div className={"mt-15 flex flex-col"}>

		<div>
			<div className={""}>Reviews</div>

			<div className={""}>{reviewAverage(productData)}</div>

			{productData.reviews.map((review)=>
				<div className={'flex flex-col w-100 h-48 mt-24'}>
					<div className={"bg-gray-700 w-full h-0.5 mb-5"}></div>

					<div className={""}>
						{review.reviewerName}
					</div>

					<div className={"absolute"}>
						{review.date.split('T')[0]}
					</div>

					<div className={""}>
						{review.rating}/5
					</div>

					<div className={""}>
						{review.comment}
					</div>

				</div>
			)}
			<div className={"bg-gray-700 w-full h-0.5"}></div>


		</div>

		</div>
	)
}

export default Reviews