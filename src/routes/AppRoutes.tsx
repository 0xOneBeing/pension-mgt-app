import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../pages/login/Login";
import ForgotPassword from "../pages/login/forgot-password/ForgotPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Contributions from "../pages/dashboard/contributions/Contributions";
import ContributionManagement from "../pages/dashboard/contributions/contributions-management/ContributionsManagement";
import Statements from "../pages/dashboard/statements/Statements";
import NotificationSettings from "../pages/dashboard/notificationSettings/NotificationsSettings";
import BenefitPreview from "../pages/dashboard/benefit-preview/BenefitPreview";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contributions"
          element={
            <ProtectedRoute>
              <Contributions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contributions/manage"
          element={
            <ProtectedRoute>
              <ContributionManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/statements"
          element={
            <ProtectedRoute>
              <Statements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/benefits"
          element={
            <ProtectedRoute>
              <BenefitPreview />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <div className="h-screen flex flex-col gap-4 justify-center items-center">
              <h1 className="text-4xl">Error 404: Page Not Found</h1>
              <Link to="/" className="hover:underline">
                Return to Login
              </Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
