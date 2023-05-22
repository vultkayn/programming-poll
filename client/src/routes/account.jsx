import React, { useState } from "react";
import Form, {
  ValidatedInput,
  createFormData,
  validators,
} from "../components/Form";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import useAuth from "../bridge/AuthProvider";

export function SignupPage() {
  const auth = useAuth();
  const [valids, setValids] = useState({
    univID: true,
    password: true,
    firstName: true,
    lastName: true,
    email: true,
    promo: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    return auth.signup(createFormData(e));
  };

  const handleError = (err) => {
    if (err.status == 401 && err.data.errors) {
      setValids({
        univID: !("univID" in err.data.errors),
        password: !("password" in err.data.errors),
        firstName: !("firstName" in err.data.errors),
        lastName: !("lastName" in err.data.errors),
        email: !("email" in err.data.errors),
        promo: !("promo" in err.data.errors),
      });
    }
  };

  return (
    <>
      <Button
        className='btn login-swap-btn'
        variant='text'
        component={Link}
        to='/account/login'>
        Login
      </Button>
      <Form
        method='post'
        reactForm={false}
        endpoint='/api/auth/'
        id='Signup-form'
        onSubmit={handleSubmit}
        onError={handleError}>
        <ValidatedInput
          label='UnivID:'
          name='univID'
          valid={valids.univID}
          validator={validators.length(1, 20)}
        />
        <ValidatedInput
          label='Password:'
          name='password'
          type='password'
          valid={valids.password}
          validator={validators.password}
        />
        <ValidatedInput
          label='First Name:'
          name='firstName'
          valid={valids.firstName}
          validator={validators.length(1, 15)}
        />
        <ValidatedInput
          label='Last Name:'
          name='lastName'
          valid={valids.lastName}
          validator={validators.length(1, 15)}
        />
        <ValidatedInput
          label='Email:'
          name='email'
          type='email'
          valid={valids.email}
          validator={validators.email}
        />
        <ValidatedInput
          label='Promo:'
          name='promo'
          type='text'
          valid={valids.promo}
          validator={(n, v, setMsg) =>
            (/[0-9]{4}/.test(v) &&
              parseInt(v) >= 1990 &&
              parseInt(v) <= 2100) ||
            (setMsg("Promotion should be between 1990 and 2100") && false)
          }
          inputProps={{ inputMode: "numeric", pattern: "[0-9]{4}" }}
        />
        <Button
          className='btn-submit'
          variant='contained'
          type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
}

export function LoginPage() {
  const auth = useAuth();
  const [valids, setValids] = useState({
    univID: true,
    password: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    return auth.login(createFormData(e));
  };

  const handleError = (err) => {
    if (err.status == 401 && err.data.errors !== undefined) {
      setValids({
        univID: !("univID" in err.data.errors),
        password: !("password" in err.data.errors),
      });
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='row'
      justifyContent='space-evenly'>
      <Button
        className='btn login-swap-btn'
        variant='text'
        component={Link}
        to='/account/signup'>
        Signup
      </Button>

      <Form
        method='post'
        reactForm={false}
        endpoint='/api/auth/login'
        id='Login-form'
        onSubmit={handleSubmit}
        onError={handleError}>
        <ValidatedInput
          label='UnivID:'
          name='univID'
          validator={validators.length(1, 20)}
          margin='normal'
          valid={valids.univID}
          fullWidth
        />
        <ValidatedInput
          label='Password:'
          name='password'
          type='password'
          validator={validators.length(1, 30)}
          margin='normal'
          valid={valids.password}
          fullWidth
        />
        <Box justifySelf='right'>
          <Button
            className='btn-submit'
            type='submit'
            variant='contained'>
            Submit
          </Button>
        </Box>
      </Form>
    </Box>
  );
}

export const UserContext = React.createContext(null);
