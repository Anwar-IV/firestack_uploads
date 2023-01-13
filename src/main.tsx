import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { UploadImages } from "./components/UploadImages";
import ErrorPage from "./components/ErrorPage";
import { Welcome } from "./components/Welcome";
import { Modal } from "./components/Modal";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { AuthContextProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/:id/images",
        element: <UploadImages />,
        children: [
          {
            path: ":url",
            element: <Modal />,
          },
        ],
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
