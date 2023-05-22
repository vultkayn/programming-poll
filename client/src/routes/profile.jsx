import React, { useState } from "react";
import { Outlet, useActionData, useLoaderData } from "react-router-dom";

import Form, {validators, ValidatedInput} from "../components/Form";

import { Button } from "@mui/material";
import Dashboard from "../components/Dashboard";


function ProfileForm () {
  const user = useLoaderData();
  const errors = useActionData();

  const [valids, setValids] = useState({
    password: true,
    firstName: true,
    lastName: true,
    email: true,
  });

  if (errors.errors !== undefined) {
    let err = errors.errors;
    setValids({
      password: !("password" in err),
      firstName: !("firstName" in err),
      lastName: !("lastName" in err),
      email: !("email" in err),
    });
  }

  return (
    <Form
      method='post'
      reactForm={true}
      id='Profile-form'>
      <ValidatedInput
        label='UnivID:'
        name='univID'    
        inputProps={{disabled: true}}    
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
        inputProps={{disabled: true}}
      />
      <Button
        className='btn-submit'
        variant='contained'
        type='submit'>
        Submit
      </Button>
    </Form>
  );
}


export function ProfilePage ()
{
  const { user } = useLoaderData();

  return (<>
  <Dashboard />
  <Outlet />
  </>)
  

}


export function EditProfilePage ()
{  

  return <ProfileForm />
}