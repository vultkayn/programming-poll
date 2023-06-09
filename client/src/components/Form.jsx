import React from "react";
import { Box } from "@mui/material";

import FormBase from "./FormBase";

export default function Form({
  method,
  endpoint,
  children,
  reactForm = false,
  onChange = (e) => {},
  onSubmit = null,
  onError = null,
  toApi = true,
  sx = {},
  BoxProps,
}) {
  const boxProps = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "start",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "80px",
    ...BoxProps
  };

  return (
    <Box
      component={FormBase}
      onSubmit={onSubmit}
      onError={onError}
      toApi={toApi}
      reactForm={reactForm}
      onChange={onChange}
      endpoint={endpoint}
      method={method}
      sx={sx}
      { ...boxProps}>
      {children}
    </Box>
  );
}

export { createFormData } from "./FormBase";
export { default as ValidatedInput, validators } from "./ValidatedInput";
export { FormBase }