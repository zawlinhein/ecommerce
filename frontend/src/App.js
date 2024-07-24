import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./component/navbar/NavBar";
import { Suspense, lazy } from "react";
import Home from "./component/Home";
import Loading from "./component/Loading";
import axios from "axios";
import { setProduct } from "./component/slice/productSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { RequireAuth } from "./component/RequireAuth";
import { validateToken } from "./component/Auth";
import { setAllUsersInfo, setUserInfo } from "./component/slice/userSlice";
import ToastNoti from "./component/ToastNoti";

function App() {
  const DetailPage = lazy(() =>
    import("./component/productsDisplay/DetailPage")
  );
  const NotFoundPage = lazy(() => import("./component/NotFoundPage"));
  const Login = lazy(() => import("./component/auth/Login"));
  const Register = lazy(() => import("./component/auth/Register"));
  const Profile = lazy(() => import("./component/profile/Profile"));
  const Cart = lazy(() => import("./component/Cart"));
  const AdminDashboard = lazy(() => import("./component/admin/AdminDashboard"));
  const AddProduct = lazy(() => import("./component/admin/AddProduct"));
  const EditUsers = lazy(() => import("./component/admin/EditUsers"));
  const Test = lazy(() => import("./component/admin/Test"));

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
        if (data.role === "admin") {
          try {
            const res = await axios.get(
              "http://localhost:8000/get-all-users-data"
            );
            dispatch(setAllUsersInfo(res.data));
          } catch (err) {
            alert("error");
          }
        }
      }
    };

    checkToken();

    fetchData();
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/products" element={<Home />} />
          <Route path="/products/:productId" element={<DetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/test" element={<ToastNoti />} />

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
          <Route
            path="/editUsers"
            element={
              <RequireAuth role="admin">
                <EditUsers />
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
