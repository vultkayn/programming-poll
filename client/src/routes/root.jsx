import React, { useEffect, useState } from "react";
import Scaffold from "../components/Scaffold";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";
import useAuth from "../bridge/AuthProvider";
import Navbar from "../components/Navbar";

const TABS = [
  {
    authRequired: false,
    authStrict: false,
    key: "1",
    props: {
      value: "1",
      label: "Practice",
      to: "/exercises",
    },
  },
  {
    authRequired: false,
    authStrict: false,
    key: "2",
    props: {
      value: "2",
      label: "Stats",
      to: "/stats",
    },
  },
  {
    authRequired: true,
    authStrict: true,
    key: "3",
    props: {
      value: "3",
      label: "Discussion",
      to: "/chat",
    },
  },
];

export default function Root() {
  const auth = useAuth(); // useContext(AuthenticationContext)
  const [logged, setLogged] = useState(null);
  useEffect(() => {
    async function pingUser() {
      await auth.get();
      setLogged(auth.logged());
    }
    pingUser();
    return () => {};
  }, []); // first time only

  if (logged == null) return null;

  console.log("Root: logged is", auth.logged());

  let tabs = TABS.filter(
    (tab) =>
      (tab.authRequired && auth.logged()) ||
      (!tab.authRequired && !auth.logged()) ||
      (!tab.authRequired && auth.logged() && !tab.authStrict)
  );

  let appbar = (
    <AppBar
      position='static'
      color='primary'
      sx={{
        mb: 2,
      }}>
      <Toolbar>
        <NavLink to='/'>
          <Typography
            variant='h4'
            component='div'
            textDecoration='none'>
            BTA
          </Typography>
        </NavLink>

        <Navbar
          textColor='inherit'
          indicatorColor='white'
          BoxProps={{
            sx: {
              width: "100%",
            },
          }}
          tabs={tabs}
          centered
        />

        {auth.logged() ? (
          <ProfileMenu />
        ) : (
          <Button
            color='inherit'
            height='minHeight'
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
