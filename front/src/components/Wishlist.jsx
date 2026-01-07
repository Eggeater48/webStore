import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Wishlist = ({ reviewAverage, removeFromWishlist }) => {
  const state = useLocation()
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector(state => state.user)

  const onImagePress = (productId) => {
    navigate(`/${productId}`)
  }

  return (
    <div className={"justify-center items-center align-middle mt-12"}>
      {user.wishlist.length !== 0 ?
        <div className={"flex-col flex gap-4"}>
          {user.wishlist.map((product) =>
            <div
              className={"w-100 outline-gray-300 h-48 outline-1 outline-solid grid grid-cols-3"}>
              <img
                className={"h-1/2 w-3/4 outline-1 outline-gray-300 outline-solid rounded-md self-center justify-self-center cursor-pointer"}
                src={product.thumbnail}
                alt={product.title}
                onClick={() => onImagePress(product.id)}
              />

              <div className={"flex flex-col gap-2 justify-self-center justify-center items-center align-middle"}>
                <div className={""}>
                  {product.title}
                </div>

                <div className={"self-start"}>
                  {reviewAverage(product)}/5
                </div>
              </div>

              <div className={"flex flex-row gap-4 self-center justify-self-center"}>
                <div className={""}>
                  €{product.price}
                </div>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className={"cursor-pointer"}>
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
          <img className={"rounded-full w-10 h-10"} alt={"boom"} src={"https://media1.tenor.com/m/p-wIO64HN5cAAAAd/wake-up.gif"} />
        </div>
      }
    </div>
  )
}

export default Wishlist