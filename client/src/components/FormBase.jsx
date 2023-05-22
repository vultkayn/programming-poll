import React, { useContext } from "react";
import "./styles/Form.css";
import Debug from "debug";
const debug = Debug("component:Form");
import AuthContext from "../bridge/AuthProvider";
import axios from "axios";
import { Form as ReactForm } from "react-router-dom";

// validator shall return false if there IS any issue

export function createFormData(e) {
  const form = e.target;
  return new FormData(form);
}

const FormBaseProps = {
  method: 'post',
  endpoint: null,
  children: {},
  reactForm: false,
  onChange: (e) => {},
  onSubmit: null,
  toApi: true,
}

export default function FormBase({
  method,
  endpoint,
  children,
  reactForm = false,
  onChange = (e) => {},
  onSubmit = null,
  toApi = true,
}) {
  const auth = useContext(AuthContext);

  const defaultHandleSubmit = (e) => {
    e.preventDefault();
    const formData = createFormData(e);

    /* */

    debug("Form submitted to", endpoint);

    const requester = toApi ? auth.send : axios.request;

    requester({
      method: method,
      url: endpoint,
      data: formData,
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("err:", err);
        switch (err.status) {
          case 400: // ill formed request
            console.err("Ill formed request");
            break;
          case 401: // Unauthorized
            console.err("Unauthorized");
            break;
          default:
            break;
        }
      });
  };

  if (reactForm)
    return (
      <ReactForm
        method={method}
        onChange={onChange}>
        {children}
      </ReactForm>
    );

  return (
    <form
      onChange={onChange}
      onSubmit={onSubmit || defaultHandleSubmit}>
      {children}
    </form>
  );
}
