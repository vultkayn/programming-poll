import React from 'react';
import ReactDOM from 'react-dom';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import { LoginPage, SignupPage } from './routes/login';
import { ProfilePage, EditProfilePage } from './routes/account';
import Home from './routes/home';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
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
            path: "account/login/",
            element: <LoginPage />,
          },
          {
            path: "account/signup/",
            element: <SignupPage />
          },
          {
            path: "account/",
            element: <ProfilePage />
          },
          {
            path: "account/edit",
            element: <EditProfilePage />
          },
        ]
      }
    ],
  }
]);


ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
