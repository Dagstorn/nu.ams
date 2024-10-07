import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/config/store/store";
import { useEffect } from "react";
import { login } from "../store/slices/authSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("userRole");

    if (localStorageToken && username && role) {
      console.log("dispatching");
      dispatch(login({ username, token: localStorageToken, role }));
    }
  }, [dispatch]);

  if (!token && !localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
