import React from "react";
import ReactDOM from "react-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import { LoginPage, SignupPage } from "./routes/account";
import { ProfilePage, EditProfilePage } from "./routes/profile";
import Home from "./routes/home";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createApiClient } from "./bridge/bridge";
import { AuthProvider } from "./bridge/AuthProvider";

const apiClient = createApiClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider apiClient={apiClient}>
        <Root />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "account/login",
            element: <LoginPage />,
            action: apiClient.login,
          },
          {
            path: "account/signup/",
            element: <SignupPage />,
            action: apiClient.signup,
          },
          {
            path: "account/logout",
            loader: apiClient.logout,
          },
          {
            path: "profile/",
            element: <ProfilePage />,
          },
          {
            path: "profile/edit",
            element: <EditProfilePage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);
