import React from "react";
import useAuth from "../bridge/AuthProvider";

import { Navigate } from "react-router-dom";

export default function RequireAuth({ children, redirectTo }) {
  const auth = useAuth();
  console.log("auth is", auth);
  return auth.logged() ? (
    { children }
  ) : (
    <Navigate
      to={redirectTo}
      replace={true}
    />
  );
}
