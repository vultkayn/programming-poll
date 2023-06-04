import { Typography, Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useOutletContext, useLoaderData, Link } from "react-router-dom";

export function CategoryIndexLoader(auth) {
  return async () => {
    const res = await auth.send({
      method: "get",
      url: `/api/practice/categories`,
    });
    console.log("res:", res);
    return res?.data ?? null;
  };
}

export function CategoryLoader(auth) {
  return async ({ params }) => {
    const uri = params.uri;
    console.log("uri is", uri);
    if (!uri || uri.length == 0) {
      // FIXME might drop that, should work both case
      const res = await auth.send({
        method: "get",
        url: `/api/practice/categories`,
      }).data;
      return res;
    }
    const res = await auth.send({
      method: "get",
      url: `/api/practice/category/${uri}`,
    });
    return res?.data ?? null;
  };
}

export default function CategoryPage() {
  const [setBreadcrumbs, setSections, setCurrent] = useOutletContext();
  // const uiPath = useLocation().pathname.replace("/practice/", "");

  const details = useLoaderData();
  const path = details?.path ?? "";

  console.log("details are", details);

  /*   const sectionsDummy = [
    {
      title: "Exercises",
      listing: [
        {
          path: "memory-pointers/exo1",
          name: "Exercise 1",
          solved: false,
          kind: 1,
        },
        {
          path: "memory-pointers/exercise-2",
          name: "Exercise 2",
          solved: true,
          kind: 1,
        },
        { path: "pointers/exo3", name: "exo3", solved: false, kind: 1 },
        { path: "memory/exo4", name: "exo4", solved: true, kind: 1 },
        { path: "c++/exo12", name: "exo12", solved: false, kind: 1 },
        { path: "memory/exercise5", name: "exercise5", solved: false, kind: 1 },
        { path: "memory/exo5", name: "exo5", solved: false, kind: 1 },
        {
          path: "garbage_collector/exo46",
          name: "exo46",
          solved: false,
          kind: 1,
        },
        { path: "oop/exo6", name: "exo6", solved: false, kind: 1 },
      ],
    },
    {
      title: "Subcategories",
      listing: [
        { path: "pointers", name: "pointers", solved: false, kind: 0 }, // FIXME path should include name too, fix above in the functions too
        { path: "memory", name: "memory", solved: false, kind: 0 },
        { path: "oop", name: "oop", solved: true, kind: 0 },
        {
          path: "garbage_collector",
          name: "garbage collector",
          solved: false,
          kind: 0,
        },
        { path: "c", name: "c", solved: false, kind: 0 },
        { path: "c++", name: "c++", solved: false, kind: 0 },
        { path: "c++-types", name: "types", solved: true, kind: 0 },
        { path: "pointers", name: "pointers", solved: false, kind: 0 },
        { path: "memory", name: "memory", solved: false, kind: 0 },
        { path: "oop", name: "oop", solved: false, kind: 0 },
        {
          path: "garbage_collector",
          name: "garbage collector",
          solved: false,
          kind: 0,
        },
        { path: "c2", name: "c", solved: false, kind: 0 },
        { path: "c++2", name: "c++", solved: false, kind: 0 },
        { path: "types2", name: "types", solved: false, kind: 0 },
      ],
    },
  ]; */

  useEffect(() => {
    setSections(details?.sections ?? []);
    setBreadcrumbs(path.endsWith("/") ? path.slice(0, -1) : path);
    setCurrent({
      path: path,
      kind: 0, // FIXME
      name: details?.name ?? "",
      description: details?.description ?? "",
    });
  }, [details]);

  if (details === null) return null;

  return (
    <Box>
      <Box
        flexDirection='row'
        display='flex'
        justifyContent='space-between'>
        <Typography
          gutterBottom
          mb={10}
          align='left'
          variant='h3'>
          {details.name}
        </Typography>
        <Button
          component={Link}
          to='/practice/@new'
          sx={{
            flexBasis: "fit-content",
            marginRight: "5vw",
            height: "min-content",
          }}
          variant='contained'>
          <Typography variant='button'>New Category</Typography>
        </Button>
      </Box>
      <Box ml={5}>
        <Typography
          paragraph
          gutterBottom
          variant='body1'
          align='left'>
          {details.description}
        </Typography>
      </Box>
    </Box>
  );
}
