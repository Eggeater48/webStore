import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

// TODO this needs a lot more work. its really scuffed at the momeent
const Wishlist = ({ reviewAverage }) => {
  const state = useLocation()
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector(state => state.user)

  const [counter, setCounter] = useState(0)

  // TODO center the text in the counter buttons
  return (
    <div className={""}>
      {user.wishlist.length !== 0 ?
        <div>
          {user.wishlist.map((product) =>
            <div className={"w-2/4 outline-gray-300 h-48 outline-1 outline-solid"}>
              <div className={"grid grid-cols-3 h-5 w-16 outline-1 outline-solid outline-gray-400 rounded-md"}>
                <button
                  className={"text-center "}
                  onClick={() => setCounter(counter + 1)}>
                  +
                </button>

                <div className={"text-center"}>
                  {counter}
                </div>

                <button
                  className={"text-center"}
                  onClick={() => setCounter(counter - 1)}>
                  -
                </button>
              </div>

            </div>
          )}
        </div>
        :
        <div className={"text-center mt-10"}>
          Your wishlist is empty.
        </div>
      }

    </div>

  )
}

export default Wishlist