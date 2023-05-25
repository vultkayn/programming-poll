import React, { useContext } from "react";
import "./styles/Form.css";
import Debug from "debug";
const debug = Debug("component:Form");
import useAuth from "../bridge/AuthProvider";
import axios from "axios";
import { Form as ReactForm } from "react-router-dom";

// validator shall return false if there IS any issue

export function createFormData(e) {
  const form = e.target;
  return new FormData(form);
}

const FormBaseProps = {
  method: "post",
  endpoint: null,
  children: {},
  reactForm: false,
  onChange: (e) => {},
  onSubmit: (e) => {},
  onError: (err) => {},
  toApi: true,
};

export default function FormBase({
  method,
  endpoint,
  children,
  reactForm = false,
  onChange = (e) => {},
  onSubmit = null,
  onError = null,
  toApi = true,
}) {
  const auth = useAuth();

  if (reactForm)
    return (
      <ReactForm
        method={method}
        onChange={onChange}>
        {children}
      </ReactForm>
    );

  const defaultErrorHandler = (err) => {
    console.error("err:", err);
    switch (err.status) {
      case 400: // ill formed request
        console.error("Ill formed request");
        break;
      case 401: // Unauthorized
        console.error("Unauthorized");
        break;
      default:
        break;
    }
    throw err;
  };

  const defaultSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = createFormData(e);
    debug("Form submitted to", endpoint);
    const requester = toApi ? auth.send : axios.request;

    const response = await requester({
      method: method,
      url: endpoint,
      data: formData,
    });
    console.log(response);
    return response;
  };

  const handleSubmit = (submitHandler, errHandler) => async (e) => {
    try {
      const response = await submitHandler(e);
      console.log("response is", response);
    } catch (err) {
      errHandler(err);
    }
  };

  return (
    <form
      onChange={onChange}
      onSubmit={handleSubmit(
        onSubmit || defaultSubmitHandler,
        onError || defaultErrorHandler
      )}>
      {children}
    </form>
  );
}
