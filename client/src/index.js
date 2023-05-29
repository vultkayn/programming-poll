import React, { StrictMode } from "react";
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
import CategoriesListingPage from "./routes/practice";
import CategoryPage from "./components/CategoryPage";
import ExercisePage from "./components/ExercisePage";
import ChatRoomPage from "./routes/chat";

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
              action: authContext.login,
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
              id: "profile",
              loader: authContext.get,
              element: <ProfilePage />,
              children: [
                {
                  path: "edit/",
                  action: authContext.update,
                  element: <EditProfilePage />,
                },
              ],
            },
            {
              path: "practice/",
              element: <CategoriesListingPage />,
              children: [
                {
                  path: ":uri",
                  children: [
                    {
                      index: true,
                      element: <CategoryPage />,
                    },
                    {
                      path: ":id",
                      element: <ExercisePage />,
                    }
                  ],
                },
              ],
            },
            {
              path: "chat/",
              element: <ChatRoomPage />,
            },
          ],
        },
      ],
    },
  ]);

function RenderRoot() {
  const auth = useAuth();
  return <RouterProvider router={router(auth)} />;
}

ReactDOM.render(
  <StrictMode>
    <AuthProvider apiClient={apiClient}>
      <RenderRoot />
    </AuthProvider>
  </StrictMode>,
  document.getElementById("root")
);
