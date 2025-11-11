import {useSelector} from "react-redux";

const CartPopUpScreenThing = () => {
  const shoppingCart = useSelector(state => state.shoppingCart)

  return (
    <div className={"flex-col"}>
      <div></div>
    </div>
  )
}

export default CartPopUpScreenThing