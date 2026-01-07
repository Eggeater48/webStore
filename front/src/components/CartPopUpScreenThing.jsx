import {useSelector} from "react-redux";

// doesnt do anything cuz it isnt implemented anywhere
// This should appear when add to card is pressed on the product screen or in the starting screen
const CartPopUpScreenThing = () => {
  const shoppingCart = useSelector(state => state.shoppingCart)

  return (
    <div className={"flex-col"}>
      <div></div>
    </div>
  )
}

export default CartPopUpScreenThing