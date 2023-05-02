import React, { useState } from 'react';
import axios from 'axios';
import './styles/Form.css';
import Debug from 'debug';
const debug = Debug('component:Form');
import { TextField } from '@mui/material';


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
}) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [invalidTxt, setInvalidTxt] = useState('Invalid field');

  function handleChange (e) {
    e.preventDefault();
    if (!bubbleUp) e.stopPropagation();
    setInvalidTxt('Invalid field');
    let invalid = required && e.target.value.length < 1
    invalid = invalid || validator(e.target.name, e.target.value, setInvalidTxt);
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

export default function Form ({ method, endpoint, children, id, onChange = (e) => { } }) {
  // const [payload, setPayload] = useState({});

  axios.defaults.headers.post['Content-Type'] = 'application/json';

  function handleSubmit (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // FIXME edit API to receive FormData as well.
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);

    debug("Form submitted to", endpoint);

    axios({
      method: method,
      url: endpoint,
      data: json
    })
      .then((res) => debug(res))
      .catch((err) => debug("err:", err));
  }


  return (
    <form onChange={onChange} onSubmit={handleSubmit} id={id}>
      {children}
    </form>
  );
}

