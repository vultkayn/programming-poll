import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { getUser } from "../bridge/account";





export default function ProfileMenu ({ menuProps }) {
  const [anchorElmt, setAnchorElmt] = useState(null);

  const handleMenu = (e) => {
    setAnchorElmt(e.currentTarget);
  }
  const handleClose = (e) => {
    setAnchorElmt(null);
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

  // BUG potential with menu props
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
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}