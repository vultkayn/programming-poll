import React from 'react';
import Form, { Input } from '../components/Form';
import { Link } from 'react-router-dom';


let passwordStrengthValidator = (name, value, setMsg) => {
  let passwordSymbolsClass = "%/_+&!:-(){}.?"
  if (value.match(/[A-Z]/).length < 1) {
    setMsg('Must be longer than 8 characters');
    return false;
  }
  if (value.match(/[A-Z]/).length < 1) {
    setMsg('Must contain at least one uppercase')
    return false;
  }
  if (value.match(/[a-z]/).length < 1) {
    setMsg('Must contain at least one lowercase')
    return false;
  }
  if (value.match(/[0-9]/).length < 1) {
    setMsg('Must contain at least one number')
    return false;
  }
  if (value.match(/[%/_+&!:\-.?]/).length < 1) {
    setMsg(`Must contain at least one of ${passwordSymbolsClass}`);
    return false;
  }
  if (!/[A-Za-z0-9%/_+&!:\-.?]{8,}/.test(value)) {
    setMsg('Contains invalid characters.');
    return false;
  }
  return true;
}

let emailValidator = (name, value) => {
  let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  return regex.test(value);
}

export function SignupPage () {
  return (
    <>
      <Link
        role="button"
        className="btn login-swap-btn"
        to="/account/login">
        Signup
      </Link>
      <Form method="post" endpoint="/api/account/" id="Signup-form">
        <Input label='UnivID:' name="univID" validator={(name, value) => value.length > 1} />
        <Input label='Password:' name="password" type="password" validator={passwordStrengthValidator} />
        <Input label='First Name:' name="firstName" validator={(n, v) => (v.length > 1 && v.length < 15)} />
        <Input label='Last Name:' name="lastName" validator={(v.length > 1 && v.length < 15)} />
        <Input label='Email:' name="email" type="email" validator={emailValidator} />
        <Input label='Promo:' name="promo" type="number" extra={{ min: '1990', max: '2100' }} />
        <button className='btn btn-submit' type="submit">Submit</button>
      </Form>
    </>);
}

/*

Top right corner: can switch between Signup and login.

Form change according to that.

*/

export function LoginPage () {
  let invalids = {
    "univID": false,
    "password": false
  };
  const validator = (name, value) => {
    switch (name) {
      case "univID":
        value.length
      // use a Ref to modify the element
    }
  }
  
  return (
    <>
      <Link
        role="button"
        className="btn login-swap-btn"
        to="/account/signup">
        Signup
      </Link>

      <Form method="post" endpoint="/api/account/login" id="Login-form" validator={validator}>
      <Input label='UnivID:' name="univID" validator={(name, value) => value.length > 1} />
      <Input label='Password:' name="password" type="password" validator={(name, value) => value.length > 1} />
      <button className='btn btn-submit' type="submit">Submit</button>
      </Form>);
    </>
  );
}