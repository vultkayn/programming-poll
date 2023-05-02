import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Tab, Tabs, Box } from '@mui/material';


export default function Navbar ({ tabs, className = '', BoxProps = {} }) {
  const [value, setValue] = useState(0);

  const tabsComp = tabs.map((tab) =>
    <Tab key={tab.key}
      label={tab.label}
      component={NavLink}
      to={tab.to}
      className={({ isActive, isPending }) =>
        isActive
          ? "nav-tab active"
          : isPending
            ? "nav-tab pending"
            : ""
      }
    />
  );

  let props = {
    ...BoxProps,
    component: "nav",
    className:`Navbar ${className}`
  }
  // BUG potential with BoxProps
  return (
    <Box {...props}>
      <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
        {tabsComp}
      </Tabs>
    </Box>
  );
}