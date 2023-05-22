import React, { useState } from "react";
import "./styles/Form.css";
import Debug from "debug";
const debug = Debug("component:ValidatedInput");
import { TextField } from "@mui/material";

export default function ValidatedInput({
  name,
  id = "",
  className = "",
  bubbleUp = true,
  validator = (name, value, setMsg) => true,
  label = "",
  type = "text",
  variant = "outlined",
  color = "primary",
  helperText = "",
  required = true,
  onFocus = (e) => {},
  ...rest
}) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [invalidTxt, setInvalidTxt] = useState("Invalid field");

  function handleChange(e) {
    e.preventDefault();
    if (!bubbleUp) e.stopPropagation();
    setInvalidTxt("Invalid field");
    let invalid = required && e.target.value.length < 1;
    invalid =
      invalid ||
      validator(e.target.name, e.target.value, setInvalidTxt) === false;
    setIsInvalid(invalid);
    helperText = isInvalid && invalidTxt ? invalidTxt : helperText;
  }

  return (
    <TextField
      name={name}
      id={id}
      label={label}
      className={className}
      type={type}
      onChange={handleChange}
      onFocus={onFocus}
      required={required}
      error={isInvalid}
      helperText={helperText}
      {...rest}
    />
  );
}