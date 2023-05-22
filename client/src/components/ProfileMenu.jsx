import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AuthContext from "../bridge/AuthProvider";



export default function ProfileMenu ({ menuProps }) {
  const [anchorElmt, setAnchorElmt] = useState(null);
  const auth = React.useContext(AuthContext);

  const handleMenu = (e) => {
    setAnchorElmt(e.currentTarget);
  }

  const handleClose = (e) => {
    setAnchorElmt(null);
  }

  const handleLogout = (e) => {
    setAnchorElmt(null);
    auth.logout();
  }

  menuProps = {
    ...menuProps,
    id:"menu-profile",
    anchorEl: anchorElmt,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    keepMounted: true,
    transformOrigin:{
      vertical: 'top',
      horizontal: 'right'
    },
    open: Boolean(anchorElmt),
    onClose: handleClose,

  }

  return (
    <div>
      <Tooltip title="Account">
        <IconButton
          size="large"
          onClick={handleMenu}
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu {...menuProps}>
        <MenuItem onClick={handleClose /*TODO use Context to pass user ID */}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}