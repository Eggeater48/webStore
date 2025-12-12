import {useState} from "react";

const ToggleableData = ({ user }) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div>
			{!visible && <div>
				<button className={""} onClick={toggleVisibility}>
					Show more
				</button>
			</div>}

			{visible && <div>

			</div>}

		</div>
	)
}

export default ToggleableData