import React from "react";
import { useLoaderData, Outlet, Link } from "react-router-dom";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";

export const loader = (apiClient) =>
  async function ({ params }) {
    const res = apiClient.send({
      method: "get",
      url: "/api/practice/categories",
    });

    if (res.data) return res;
  };

export default function CategoriesListingPage() {
  // const categories = useLoaderData();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const categories = [
    "pointers",
    "memory",
    "oop",
    "garbage collector",
    "c",
    "c++",
    "types",
  ];

  const handleClick = (e, idx) => setSelectedIndex(idx);

  return (
    <>
      <Box
        height='100%'
        maxWidth={300}>
        <List disablePadding subheader={
          <ListSubheader component="div" disableSticky={true} inset sx={{borderBottom: "1px solid grey"}}>
            Categories
          </ListSubheader>
        }>
          {categories.map((cat, idx) => {
            let safeCatUI = cat.replace(/[^\w ._,+-]/, "");
            let safeCat = safeCatUI
              .replace(" ", "-")
              .replace(/[^a-zA-Z0-9-+]/, "");
            return (
              <ListItemButton
                component={Link}
                selected={selectedIndex === idx}
                onClick={(e) => handleClick(e, idx)}
                key={safeCat}
                to={safeCat}>
                <ListItemText
                  primary={
                    safeCatUI[0].toUpperCase() +
                    safeCatUI.slice(1).toLowerCase()
                  }
                  inset
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
      <Outlet />
    </>
  );
}
