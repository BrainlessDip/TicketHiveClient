import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./provider/AuthProvider";
import "./index.css";
import { router } from "./routes/Router";
import { RouterProvider } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />{" "}
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer
      position="top-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </StrictMode>
);
