import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";
import { getUser } from "../bridge/account";

export async function loader ({params}) {
  const user = await getUser(params.id);
  return { user };
}

export default function ProfileMenu ({ menuProps }) {
  const {user} = useLoaderData();
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
    onClose:{handleClose},

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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}