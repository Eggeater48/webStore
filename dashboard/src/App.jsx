import {
  Routes,
  Route,
  useMatch, useNavigate, useLocation,
} from "react-router-dom";
import TheChoice from "./components/TheChoice.jsx";
import UserData from "./components/UserData.jsx";
import ProductData from "./components/ProductData.jsx";
import ProductAddNew from "./components/ProductAddNew.jsx";


function App() {
  return (
    <div className={""}>
      <Routes>
        <Route path={"/"} element={<TheChoice />} />
        <Route path={"/users"} element={<UserData />} />
        <Route path={"/products"} element={<ProductData />} />
        <Route path={"/products/addNew"} element={<ProductAddNew />}
        <Route path={"/orders"} element={} />
      </Routes>
    </div>
  )
}

export default App