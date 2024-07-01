import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar";
import { Suspense, lazy } from "react";
import Home from "./component/Home";
import Loading from "./component/Loading";
import axios from "axios";
import { setProduct, toggleLoginFlag } from "./component/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RequireAuth } from "./component/RequireAuth";
import { validateToken } from "./component/Auth";
import { setUserInfo } from "./component/userSlice";

function App() {
  const DetailPage = lazy(() => import("./component/DetailPage"));
  const NotFoundPage = lazy(() => import("./component/NotFoundPage"));
  const Login = lazy(() => import("./component/Login"));
  const Register = lazy(() => import("./component/Register"));
  const Profile = lazy(() => import("./component/Profile"));
  const Cart = lazy(() => import("./component/Cart"));
  const AdminDashboard = lazy(() => import("./component/AdminDashboard"));

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

    const checkToken = async () => {
      const data = await validateToken();
      if (data) {
        dispatch(setUserInfo(data));
        dispatch(toggleLoginFlag(true));
      } else dispatch(toggleLoginFlag(false));
    };

    checkToken();

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
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth role="admin">
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
