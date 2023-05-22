import React, { useContext, useState } from "react";
import Scaffold from "../components/Scaffold";
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from "@mui/material";
import { NavLink } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";
import AuthContext from "../bridge/AuthProvider";

export default function Root() {
  const auth = useContext(AuthContext);
  const [value, setValue] = useState("1");
  let appbar = (
    <AppBar
      position='static'
      color='primary'
      sx={{
        mb: 2
      }}>
      <Toolbar>
        <NavLink
          to='/'
        >
          <Typography
            variant='h4'
            component='div'
            textDecoration='none'>
            BTA
          </Typography>
        </NavLink>

        <Tabs
          value={value}
          textColor='inherit'
          indicatorColor='white'
          onChange={(e, newValue) => setValue(newValue)}
          sx={{
            width: "100%",
          }}
          centered>
          <Tab
            key='1'
            value='1'
            label='Practice'
            component={NavLink}
            to='/exercises'
          />
        </Tabs>

        {auth.logged() ? (
          <ProfileMenu />
        ) : (
          <Button
            color='inherit'
            component={NavLink}
            to='/account/login'>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );

  return <Scaffold header={appbar} />;
}
