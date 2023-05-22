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
import useAuth, { AuthProvider } from "./bridge/AuthProvider";

const apiClient = createApiClient();

const router = (authContext) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Root />,
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
            },
            {
              path: "account/signup/",
              element: <SignupPage />,
            },
            {
              path: "account/logout",
              action: authContext.logout,
            },
            {
              path: "profile/",
              loader: authContext.get,
              element: (
                <ProfilePage />
              ),
              children: [
                {
                  path: "edit/",
                  action: authContext.update,
                  element: (
                    <EditProfilePage />
                  ),
                },
              ]
            },
          ],
        },
      ],
    },
  ]);

function RenderRoot() {
  const auth = useAuth();
  return (
      <RouterProvider router={router(auth)} />
  );
}

ReactDOM.render(
  <AuthProvider apiClient={apiClient}>
    <RenderRoot/>
  </AuthProvider>,
  document.getElementById("root")
);
