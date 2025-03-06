import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { login } from "../features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authState = localStorage.getItem("authState");

    if (authState) {
      try {
        const userData = JSON.parse(authState);
        dispatch(login(userData));
      } catch (error) {
        console.error("Failed to parse auth data from localStorage:", error);
        localStorage.removeItem("authState");
      }
    }

    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="text-center mt-[20%]">
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
