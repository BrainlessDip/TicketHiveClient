import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Loading from "../components/ui/Loading";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NonUserRounte from "./NonUserRounte";
import ResetPassword from "../pages/ResetPassword";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";

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
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
