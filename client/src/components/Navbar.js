import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles/Navbar.css';

export default function Navbar ({ tabs, className }) {

  const tabsComp = tabs.map((tab) =>
    <Tab
      title={tab.name}
      path={tab.to}
      key={tab.key}
    />
  );

  return (
    <nav className={'Navbar ' + className}>
      <ul>
        {tabsComp}
      </ul>
    </nav>
  );
}


function Tab ({ title, path, key }) {
  return (
    <li key={key} className="nav-tab">
      <NavLink
        to={path}
        className={({ isActive, isPending }) =>
          isActive
            ? "active"
            : isPending
              ? "pending"
              : ""
        }
      >
        {title}
      </NavLink>
    </li>
  );
}