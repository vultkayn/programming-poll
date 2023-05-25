import React from "react";
import { useLoaderData } from "react-router-dom";

import { Box } from "@mui/material";

export const loader = (apiClient) =>
  async function ({ params }) {
    const res = apiClient.send({
      method: "get",
      url: "/api/practice/categories",
    });

    if (res.data) return res;
  };

export default function CategoriesListingPage() {
  const categories = useLoaderData();

  return (
    <Box
      bgcolor='#e9eaf4'
      height='100%'>
      Categories
    </Box>
  );
}
