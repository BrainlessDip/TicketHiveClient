import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Loading from "../components/ui/Loading";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NonUserRounte from "./NonUserRounte";

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
        path: "/register",
        element: (
          <NonUserRounte>
            <Register></Register>
          </NonUserRounte>
        ),
      },
    ],
  },
]);
