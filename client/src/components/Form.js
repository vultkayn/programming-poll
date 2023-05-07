import React, { useState, useContext } from 'react';
import './styles/Form.css';
import Debug from 'debug';
const debug = Debug('component:Form');
import { TextField } from '@mui/material';
import AuthContext from '../bridge/AuthProvider';
import axios from "axios";

// validator shall return false if there IS any issue

export function ValidatedInput ({
  name,
  id = '',
  className = '',
  bubbleUp = true,
  validator = (name, value, setMsg) => true,
  label = "",
  type = "text",
  variant = 'outlined',
  color = 'primary',
  helperText = '',
  required = true,
  onFocus = (e) => { },
  ...rest
})
{
  const [isInvalid, setIsInvalid] = useState(false);
  const [invalidTxt, setInvalidTxt] = useState('Invalid field');

  function handleChange (e)
  {
    e.preventDefault();
    if (!bubbleUp) e.stopPropagation();
    setInvalidTxt('Invalid field');
    let invalid = required && e.target.value.length < 1
    invalid = invalid || validator(e.target.name, e.target.value, setInvalidTxt) === false;
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
      {...rest} />
  );
}


export default function Form ({ method, endpoint, children, id, onChange = (e) => { }, onSubmit = null, toApi = true, onError = (e, err) => { } })
{
  const auth = useContext(AuthContext);

  const defaultHandleSubmit = (e) =>
  {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    /* */

    debug("Form submitted to", endpoint);

    const requester = toApi ? auth.send : axios.request;

    requester({
      method: method,
      url: endpoint,
      data: formData
    })
      .then((res) => console.log(res))
      .catch((err) =>
      {
        console.error("err:", err)
        switch (err.status) {
          case 400: // ill formed request    
            break;
          case 401: // Unauthorized
            break;
          default:
            break;
        }
      });
  }


  return (
    <form onChange={onChange} onSubmit={onSubmit || defaultHandleSubmit} id={id}>
      {children}
    </form>
  );
}

