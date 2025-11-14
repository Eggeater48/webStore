import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Wishlist = ({ reviewAverage, removeFromWishlist }) => {
  const state = useLocation()
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector(state => state.user)

  return (
    <div className={""}>
      {user.wishlist.length !== 0 ?
        <div className={"flex-col flex gap-4"}>
          {user.wishlist.map((product) =>
            <div className={"w-100 outline-gray-300 h-48 outline-1 outline-solid grid grid-cols-3"}>
              <img
                className={"h-1/2 w-3/4 outline-1 outline-gray-300 outline-solid rounded-md self-center justify-self-center"}
                src={product.thumbnail}
                alt={product.title}/>

              <div className={"flex flex-col gap-3 justify-self-center"}>
                <div className={""}>
                  {product.title}
                </div>

                <div className={""}>
                  {reviewAverage(product)}/5
                </div>
              </div>

              <div className={"flex flex-row gap-4 self-center justify-self-center"}>
                <div className={""}>
                  €{product.price}
                </div>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className={""}>
                  <img
                    className={"rounded-full w-4 h-4"}
                    src={"/src/assets/delete.svg"}
                    alt={"Remove from wishlist"}/>
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