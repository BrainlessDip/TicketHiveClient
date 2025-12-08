import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Loading from "../components/ui/Loading";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import UserRoute from "./UserRoute";
import NonUserRoute from "./NonUserRoute";
import VendorRoute from "./VendorRoute";
import AddTicket from "../pages/AddTicket";
import MyAddedTickets from "../pages/MyAddedTickets";
import EditTicket from "../pages/EditTicket";
import AdminRoute from "./AdminRoute";
import ManageTickets from "../pages/ManageTickets";
import ManageUsers from "../pages/ManageUsers";
import AdvertiseTickets from "../pages/AdvertiseTickets";

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
          <NonUserRoute>
            <Login></Login>
          </NonUserRoute>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <NonUserRoute>
            <ResetPassword></ResetPassword>
          </NonUserRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <NonUserRoute>
            <Register></Register>
          </NonUserRoute>
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
        path: "/dashboard/add-ticket",
        element: (
          <VendorRoute>
            <AddTicket></AddTicket>
          </VendorRoute>
        ),
      },
      {
        path: "/dashboard/edit-ticket/:id",
        element: (
          <VendorRoute>
            <EditTicket></EditTicket>
          </VendorRoute>
        ),
      },
      {
        path: "/dashboard/my-added-ticket",
        element: (
          <VendorRoute>
            <MyAddedTickets></MyAddedTickets>
          </VendorRoute>
        ),
      },
      {
        path: "/dashboard/manage-tickets",
        element: (
          <AdminRoute>
            <ManageTickets></ManageTickets>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/advertise-tickets",
        element: (
          <AdminRoute>
            <AdvertiseTickets></AdvertiseTickets>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
