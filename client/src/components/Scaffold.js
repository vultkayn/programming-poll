import React from 'react';

import { Outlet } from 'react-router-dom';


export default function Scaffold ({ header }) {
  return (
    <div id="scaffold">
      <div id="scaffold-header">
        {header}
      </div>

      <div id="scaffold-main">
        <Outlet />
      </div>
    </div>
  );
}
