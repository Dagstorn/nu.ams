import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import MainLayout from "@/pages/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManagerDashboard from "@/pages/manager/ManagerDashboard";
import ErrorPage from "./ErrorPage";
import AlumniList from "@/pages/admin/AlumniList";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin",
        element: <MainLayout />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "alumni",
            element: <AlumniList />,
          },
        ],
      },
      {
        path: "teacher",
        element: <MainLayout />,
        children: [
          {
            path: "dashboard",
            element: <ManagerDashboard />,
          },
        ],
      },
    ],
  },
]);

export default router;
