import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useFetcher, useNavigate } from "react-router-dom";



export default function ProfileMenu ({ menuProps }) {
  const [anchorElmt, setAnchorElmt] = useState(null);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleMenu = (e) => {
    setAnchorElmt(e.currentTarget);
  }

  const handleProfile = (e) => {
    setAnchorElmt(null);
    navigate("/profile");
  }

  const handleLogout = (e) => {
    setAnchorElmt(null);
    fetcher.submit({idle: true}, {method: "post", action: "/account/logout"});
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
    onClose: (e) => setAnchorElmt(null),

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
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}