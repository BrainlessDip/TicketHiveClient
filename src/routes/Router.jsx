import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Loading from "../components/ui/Loading";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    HydrateFallback: Loading,
    children: [
      { index: true, element: <h1>HOME</h1> },
      { path: "/login", Component: Login },
    ],
  },
]);
