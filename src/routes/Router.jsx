import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Loading from "../components/ui/Loading";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NonUserRounte from "./NonUserRounte";
import ResetPassword from "../pages/ResetPassword";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/UserProfile";
import DashboardLayout from "../layouts/DashboardLayout";
import UserRounte from "./UserRounte";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    HydrateFallback: Loading,
    children: [
      { index: true, element: <h1>HOME</h1> },
      {
        path: "/login",
        element: (
          <NonUserRounte>
            <Login></Login>
          </NonUserRounte>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <NonUserRounte>
            <ResetPassword></ResetPassword>
          </NonUserRounte>
        ),
      },
      {
        path: "/register",
        element: (
          <NonUserRounte>
            <Register></Register>
          </NonUserRounte>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    HydrateFallback: Loading,
    children: [
      { index: true, element: <h1>Dashboard</h1> },
      {
        path: "/dashboard/profile",
        element: (
          <UserRounte>
            <Profile></Profile>
          </UserRounte>
        ),
      },
    ],
  },
]);
