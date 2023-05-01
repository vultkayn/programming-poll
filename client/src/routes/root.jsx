import React from "react";
import Scaffold from "../components/Scaffold";
import Navbar from "../components/Navbar";

export default function Root () {
  let navbar = <Navbar
    className='Navbar-main'
    tabs={[
      {
        key: 0,
        name: "index",
        to: '/'
      },
      {
        key: 1,
        name: "login",
        to: "account/login/"
      }
    ]}
  />

  return (
    <Scaffold
      header={navbar}
    />
  );
}
