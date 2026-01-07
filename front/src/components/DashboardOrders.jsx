import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import userService from "../services/userService.js";

// just shows all the orders you've made on this user account
const DashboardOrders = () => {
  const [userOrders, setUserOrders] = useState([])
  const [orderStatus, setOrderStatus] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state => state.user)

  useEffect(() => {
    userService.getUserOrderHistory(user.id).then((userData) => {
      setOrderStatus(userData.status)
      setUserOrders(userData.products)
    })
  }, []);

  return (
    <div className={""}>
      <button className={""} onClick={() => navigate('/dashboard')}>
        Go back
      </button>

      <div className={""}>
        Order history
      </div>

      {user.orders ?
        <div>
          No orders
        </div>
        :
        <div className={"flex flex-col gap-4"}>
          {userOrders.map(order =>
            <div key={order.id} className={""}>
              <img
                className={"w-40 h-40"}
                src={order.productData[0].thumbnail}
                alt={order.productData[0].title}
                onClick={() => navigate(`/${order.productData[0].id}`)}
              />

              <div className={""}>
                {order.productData[0].title}
              </div>

              <div className={""}>
                {order.quantity}
              </div>

              <div className={""}>
                {order.totalPrice}
              </div>

              <div className={""}>
                {order.purchaseDate}
              </div>

              <button className={""} onClick={() => alert("I dont actually do anything atm")}>
                Get help with this purchase!!
              </button>
            </div>
          )}

          <div className={""}>
            {orderStatus}
          </div>
        </div>
      }
    </div>
  )
}

export default DashboardOrders