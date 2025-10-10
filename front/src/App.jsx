import Products from "./components/Products.jsx";
import NavBar from "./components/NavBar.jsx"
import {
  Routes,
  Route,
  useMatch,
} from "react-router-dom";
import Product from "./components/Product.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, incrementItemCount} from "./reducers/shoppingCartReducer.js";
import {initialProducts} from "./reducers/productReducer.js";
import {useEffect} from "react";

//TODO change the import order cuz its kinda disturbing right now

function App() {
  const shoppingCart = useSelector(state => state.shoppingCart)
  const productList = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialProducts())
  }, [dispatch])

  const calculateAverage = (product) => {
    const reviewList = product.reviews.map(review =>
      review.rating
    )

    return (reviewList.reduce((a, b) => a + b, 0 ) / reviewList.length).toFixed(1)
  }

  const totalReviews = (product) => {
    return product.reviews.map(review =>
      review.rating
    ).length
  }

  const addToCart = (product) => {
    const isItReallyInTheCart = shoppingCart.find(({ id }) => id === product.id)

    if (isItReallyInTheCart === undefined) {
      dispatch(addItemToCart({
        ...product,
        count: 1
      }))
    } else {
      dispatch(incrementItemCount(isItReallyInTheCart))
    }
  }

  const match = useMatch('/:id')
  const product = match
    ? productList.find(product => product.id === match.params.id)
    : null

  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={<Products reviewAverage={calculateAverage} addToCart={addToCart} totalReviews={totalReviews} /> } />
        <Route path='/:id' element={<Product productData={product} reviewAverage={calculateAverage} addToCart={addToCart}  />} />
        <Route path='/cart' element={<ShoppingCart />} />
      </Routes>
    </>
  )
}

export default App