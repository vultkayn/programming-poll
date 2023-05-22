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
  valid = true,
  onFocus = (e) => {},
  ...rest
}) {
  const [isInvalid, setIsInvalid] = useState(! valid);
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
      error={isInvalid && valid}
      helperText={helperText}
      {...rest}
    />
  );
}


const passwordStrengthValidator = (name, value, setMsg) => {
  let passwordSymbolsClass = "%/_+&!:-(){}.?";
  if (value.match(/[A-Z]/).length < 1) {
    setMsg("Must be longer than 8 characters");
    return false;
  }
  if (value.match(/[A-Z]/).length < 1) {
    setMsg("Must contain at least one uppercase");
    return false;
  }
  if (value.match(/[a-z]/).length < 1) {
    setMsg("Must contain at least one lowercase");
    return false;
  }
  if (value.match(/[0-9]/).length < 1) {
    setMsg("Must contain at least one number");
    return false;
  }
  if (value.match(/[%/_+&!:\-.?]/).length < 1) {
    setMsg(`Must contain at least one of ${passwordSymbolsClass}`);
    return false;
  }
  if (!/[A-Za-z0-9%/_+&!:\-.?]{8,}/.test(value)) {
    setMsg("Contains invalid characters.");
    return false;
  }
  return true;
};

const emailValidator = (name, value) => {
  let regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regex.test(value);
};

export const validators = {
  email: emailValidator,
  password: passwordStrengthValidator,
  length: (minL, maxL) => (n, v) => v.length > minL && v.length < maxL, 
}