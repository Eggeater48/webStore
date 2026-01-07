import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
//import {addNewReview} from "../reducers/productReducer.js";
// open this component and path if your feeling really brave and arent scared of bad / not even half baked ui desingn
//TODO finish this.. Its probably the worst part of this mess of an app
const Reviews = ({ productData, reviewAverage }) => {
	const [showForm, setShowForm] = useState(false)
	const dispatch = useDispatch() // Write a thunk for the productReducer that updates the data both on the mongo side and client side
	const navigate = useNavigate()
	const user = useSelector(state => state.user)

	const onNewReview = () => {
		if (!user) {
			navigate('/login', { state: { pathname: `/${productData.id}/review` }})
		} else {
			navigate(`/${productData.id}/review`, { state: { productData } })
		}
	}

	return (
		<div className={"flex flex-col"}>
			<div className={""}>
				<div className={"mb-4 mt-4"}>
					<div className={"text-4xl"}>
						Reviews
					</div>

					<div className={""}>
						{reviewAverage(productData)}/5
					</div>

					<div className={"cursor-pointer"} onClick={onNewReview}>
						Write a review
					</div>
				</div>

				{productData.reviews.map((review)=>
					<div className={'flex flex-col w-100 h-48 mt-12'}>
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

						<div className={"mt-2"}>
							{review.comment}
						</div>
					</div>
				)}
			</div>

		</div>
	)
}

export default Reviews