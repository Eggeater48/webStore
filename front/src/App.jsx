import Products from "./components/Products.jsx";
import NavBar from "./components/NavBar.jsx"
import {
  Routes,
  Route,
  useMatch, useNavigate, useLocation,
} from "react-router-dom";
import SingularProduct from "./components/SingularProduct.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, incrementItemCount} from "./reducers/shoppingCartReducer.js";
import {initialProducts} from "./reducers/productReducer.js";
import {useEffect} from "react";
import LoginScreen from "./components/LoginScreen.jsx";
import SignUpScreen from "./components/SignUpScreen.jsx";
import {removeProductFromWishlist, setWishlist} from "./reducers/userReducer.js";
import userService from "./services/userService.js";
import ReviewWrite from "./components/ReviewWrite.jsx";
import Wishlist from "./components/Wishlist.jsx";
import Footer from "./components/Footer.jsx";
import CheckOutScreen from "./components/CheckOutScreen.jsx";

//TODO change the import order cuz its kinda disturbing right now

function App() {
  const shoppingCart = useSelector(state => state.shoppingCart)
  const productList = useSelector(state => state.products)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // TODO do i really need to document the functions if their names are kinda self explanatory
  // if i were better at photoshop i'd change the product backgrounds to gray or smthing
  // cuz white doesnt really fit well
  // and i couldnt find a site that gives images with gray backgrounds (is it even that important)

  // just makes the window always start at the top
  // most useful for singularProduct.jsx when using the you may also like products
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]);

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
      console.log(shoppingCart)
    }
  }

  const addToWishlist = async (productId) => {
    if (!user) {
      navigate('/login')
    } else if (user.wishlist.find(product => product.id === productId)) {
      console.log('Product is already in your wishlist') // This part is redundant but ill just leave it here just in case
    }	else {
      const result = await userService.addProductToWishlist(user.id, productId)
      dispatch(setWishlist(result.wishlist))
    }
  }

  const removeFromWishlist = async (productId) => {
    dispatch(removeProductFromWishlist(productId))
    const result = await userService.removeProductFromWishlist(user.id, productId)
    console.log(result)
  }

  // thought it would be cool to implement a "you may also like" function, altho the way i did implement it was kinda stupid
  const youMayAlsoLike = () => {
    const randomProducts = []

    for (let i = 0; i < 4; i++) {
      randomProducts.push(productList[Math.floor(Math.random()*productList.length)])
    }

    return randomProducts
  }

  // Looks at the id from the url at the tippity top and searches for a matching id from a product from my database
  const match = useMatch('/:id')
  const product = match
    ? productList.find(product => product.id === match.params.id)
    : null

  return (
    <div className={'w-screen h-screen '}>
      <div className={"p-10"}>
        <NavBar />

        <Routes>
          <Route path='/' element={<Products
            productData={productList}
            reviewAverage={calculateAverage}
            addToCart={addToCart}
            totalReviews={totalReviews}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist} /> } />

          <Route path='/:id' element={<SingularProduct
            alsoLike={youMayAlsoLike}
            productData={product}
            reviewAverage={calculateAverage}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist} />} />

          <Route path='/cart' element={<ShoppingCart />} />

          <Route path='/login' element={<LoginScreen />} />

          <Route path='/signup' element={<SignUpScreen />} />

          <Route path='/:id/review' element={<ReviewWrite
            reviewAverage={calculateAverage} />} />

          <Route path='/wishlist' element={<Wishlist
            productData={productList}
            reviewAverage={calculateAverage}
            removeFromWishlist={removeFromWishlist} />} />

          <Route path='/checkout' element={<CheckOutScreen

          /> } />

        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App