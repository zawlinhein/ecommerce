import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar";
import { Suspense, lazy } from "react";
import Home from "./component/Home";
import Loading from "./component/Loading";
import axios from "axios";
import { setProduct } from "./component/productSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { RequireToken } from "./component/Auth";

function App() {
  const DetailPage = lazy(() => import("./component/DetailPage"));
  const NotFoundPage = lazy(() => import("./component/NotFoundPage"));
  const Login = lazy(() => import("./component/Login"));
  const Register = lazy(() => import("./component/Register"));
  const Profile = lazy(() => import("./component/Profile"));
  const Cart = lazy(() => import("./component/Cart"));

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await axios.get(
          "http://localhost:8000/get/allproducts"
        );
        dispatch(setProduct(respone.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<DetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <RequireToken>
                <Profile></Profile>
              </RequireToken>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
