import React from 'react';
import Form, { ValidatedInput } from '../components/Form';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'


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
      <Button
        className="btn login-swap-btn"
        variant="text"
        component={Link}
        to="/account/login">
        Login
      </Button>
      <Form method="post" endpoint="/api/account/" id="Signup-form">
        <ValidatedInput label='UnivID:' name="univID" validator={(name, value) => value.length > 1} />
        <ValidatedInput label='Password:' name="password" type="password" validator={passwordStrengthValidator} />
        <ValidatedInput label='First Name:' name="firstName" validator={(n, v) => (v.length > 1 && v.length < 15)} />
        <ValidatedInput label='Last Name:' name="lastName" validator={(n, v) => (v.length > 1 && v.length < 15)} />
        <ValidatedInput label='Email:' name="email" type="email" validator={emailValidator} />
        <ValidatedInput
          label='Promo:'
          name="promo"
          type="text"
          validator={(n, v, setMsg) =>
            (/[0-9]{4}/.test(v) && parseInt(v) >= 1990 && parseInt(v) <= 2100) || (setMsg('Promotion should be between 1990 and 2100') && false) // BUG potential bug here ?
          }
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]{4}' }}
        />
        <Button className='btn-submit' variant="contained" type="submit">Submit</Button>
      </Form>
    </>
  );
}


export function LoginPage () {

  return (
    <>
      <Button
        className="btn login-swap-btn"
        variant="text"
        component={Link}
        to="/account/signup">
        Signup
      </Button>

      <Form method="post" endpoint="/api/account/login" id="Login-form">
        <ValidatedInput label='UnivID:' name="univID" validator={(name, value) => value.length > 1} />
        <ValidatedInput label='Password:' name="password" type="password" validator={(name, value) => value.length > 1} />
        <Button className='btn-submit' type="submit" variant="contained">Submit</Button>
      </Form>
    </>
  );
}

export const UserContext = React.createContext(null);