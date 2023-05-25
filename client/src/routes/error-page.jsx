import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import "./styles/error.css";

import { Typography } from "@mui/material";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div id='error-page'>
        <Typography variant='h2' fontFamily="Monospace">Oops! Error {error.status}</Typography>
        <p>
          <Typography variant="body1">Sorry, an unexpected error has occurred.</Typography>
        </p>
        <p>
          <Typography color="#444" fontWeight="200" fontStyle="oblique">
            {error.statusText || error.message}
          </Typography>
        </p>
      </div>
    );
  }
}
