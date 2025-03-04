import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate checking authentication state (e.g., from localStorage or an API)
    const authState = localStorage.getItem("authState");
    if (authState) {
      setIsLoading(false); // Authentication state is initialized
    } else {
      setIsLoading(false); // No authentication state found
    }
  }, []);

  if (isLoading) {
    // return <div>Loading...</div>; // Show a loading spinner or placeholder
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <Spin size="large" />
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <div>
      <Navigate to="/" />
    </div>
  );
};

export default ProtectedRoute;
