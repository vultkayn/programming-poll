import React from "react";
import { Box } from "@mui/material";

import FormBase from "./FormBase";

export default function Form({
  vertical = false,
  method,
  endpoint,
  children,
  reactForm = false,
  onChange = (e) => {},
  onSubmit = null,
  toApi = true,
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
      toApi={toApi}
      reactForm={reactForm}
      onChange={onChange}
      endpoint={endpoint}
      method={method}
      { ...boxProps}>
      {children}
    </Box>
  );
}

export { createFormData } from "./FormBase";
export { default as ValidatedInput } from "./ValidatedInput";
export { FormBase }