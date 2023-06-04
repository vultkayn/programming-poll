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
import CategoriesListingPage, {CategoryPage, ExercisePage} from "./routes/practice";
import ChatRoomPage from "./routes/chat";
import { CategoryIndexLoader, CategoryLoader } from "./routes/category";
import CategoryCreationForm, {action as CategoryCreationAction} from "./routes/categoryCreation";
import ExerciseCreationForm, {action as ExerciseCreationAction} from "./routes/exerciseCreation";

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
              errorElement: <ErrorPage />,
              children: [
                {
                  index: true,
                  id: 'categoryIndex',
                  loader: CategoryIndexLoader(authContext),
                  element:<CategoryPage />
                },
                {
                  path: "@new",
                  action: CategoryCreationAction(authContext),
                  element: <CategoryCreationForm />
                },

                {
                  path: ":uri",
                  children: [
                    {
                      index: true,
                      id: 'category',
                      loader: CategoryLoader(authContext),
                      element: <CategoryPage />,
                    },
                    {
                      path: "@new",
                      action: ExerciseCreationAction(authContext),
                      element: <ExerciseCreationForm />
                    },
                    {
                      path: ":id",
                      id: "exercise",
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
