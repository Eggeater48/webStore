import {useNavigate} from "react-router-dom";

// Small component portrait (?) featuring all the cool important info that the user would need abt the product
const SingularProductFrame = ({ product, reviewAverage, addToCart }) => {
  const navigate = useNavigate()

  const onSelect = (product) => {
    navigate(`/${product.id}`)
  }

  return (
    <div className={"cursor-pointer rounded-md evil-border-outline-shadow p-3"}>
      <div key={product.id} className={"w-52 h-80"}>
        <div className={"h-60 w-52 rounded-md overflow-hidden"}>
          <div onClick={() => {onSelect(product)}}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className={"relative w-auto h-auto align-middle "}
            />
          </div>
        </div>

        <div className={""}>
          <div className={"text-pretty"}>
            {product.title}
          </div>

          <div className={"relative"}>
            {reviewAverage(product)}/5
          </div>

          <div className={"flex"}>
            <div className={"text-orange-500"}>
              €{product.price}
            </div>
          </div>

        </div>
      </div>

      <div className={"flex justify-end mr-4"} onClick={() => {addToCart(product)}}>
        <div
          className={"relative rounded-full bg-orange-300 w-8 h-8 flex justify-center"}>
          <img src={"/src/assets/shopping_cart_add.svg"} alt={"add to cart"} className={""} />
        </div>
      </div>
    </div>
  )
}

export default SingularProductFrame
