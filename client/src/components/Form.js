import React, { useState } from 'react';
import axios from 'axios';
import './styles/Form.css';
import Debug from 'debug';
const debug = Debug('component:Form');

export function Input ({
  name,
  className = '',
  invalidCls = 'invalid',
  noInvalidMsg = false,
  id = '',
  label = "",
  validator = (name, value, setMsg) => true,
  type = "text",
  bubbleUp = false,
  required = true,
  onFocus = (e) => { },
  extra = {}
}) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [invalidMsg, setInvalidMsg] = useState('Invalid field');

  function handleChange (e) {
    e.preventDefault();
    if (!bubbleUp) e.stopPropagation();
    setInvalidMsg('Invalid field');
    setIsInvalid(validator(e.target.name, e.target.value, setInvalidMsg));
  }


  let input = <input
    id={id}
    className={`input ${className} ${isInvalid ? invalidCls : ''}`}
    name={name}
    type={type}
    onChange={handleChange}
    onFocus={onFocus}
    required={required}
    {...extra} />

  return (
    <>
      {label ? <label htmlFor={name}>input</label> : input}
      {isInvalid && invalidMsg && !noInvalidMsg ? <span className='form-error'>{invalidMsg}</span> : null}
    </>
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

