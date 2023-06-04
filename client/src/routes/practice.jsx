import React, { useEffect } from "react";
import { useLoaderData, Outlet, Link as RouterLink } from "react-router-dom";
import "../components/styles/Sidebar.css";
import Sidebar, { SidebarListing, makeSolvedIcon } from "../components/Sidebar";

import { Box, Breadcrumbs, Typography, Link as MUILink } from "@mui/material";

/**
 * @brief Upon creation of an exercise or category,
 * use the user-friendly formatted path and name to produce a database friendly
 * path and name.
 *
 * @param {string} path path at the format cat1/cat2/.../
 * @param {int} kind 0 for a category, 1 for an exercise
 */
export function preparePathForServer({ path, name, kind }) {
  const formatPath = (path) => {
    const pathBeg = path && path.length > 0 && path[0] === "/" ? 1 : 0;
    const pathEnd = // remove ending separator if any.
      path && path.length > 1 && path.endsWith("/")
        ? path.length - 1
        : path.length;
    return path
      .slice(pathBeg, pathEnd)
      .replaceAll(/[^a-zA-Z0-9-+_/]/g, "")
      .replaceAll("-", "_")
      .replaceAll("/", "-");
  };

  const formatNameURI = (filteredName) => {
    return filteredName
      .replaceAll(/[^a-zA-Z0-9-+_ ]/g, "")
      .replaceAll("-", "_")
      .replaceAll(" ", "_");
  };

  const pureName = name.toLowerCase().replaceAll(/[^\w ._,+-]/g, "");
  const pureNameURI = formatNameURI(pureName);
  const uri = formatPath(path.toLowerCase());

  let sep = null;
  if (kind === 0) sep = uri.length === 0 /* root? */ ? "" : "-";
  else if (kind === 1) sep = uri.length === 0 /* root? */ ? null : "/"; // no exercises allowed for root, so cannot have empty here
  if (sep === null) sep = ""; //throw new Error(""); // TODO improved the error type

  return { target: uri + sep + pureNameURI, relPath: uri, uiName: pureName };
}

export default function CategoriesListingPage() {
  const [breadcrumbs, setBreadcrumbs] = React.useState("");
  const [sections, setSections] = React.useState([]);
  const [current, setCurrent] = React.useState({});
  const isIndex = breadcrumbs.length === 0;
  /*     {
      title: "Subcategories",
      listing: [
        { path: "pointers", name: "pointers", solved: false, kind: 0 }, // FIXME path should include name too, fix above in the functions too
        { path: "memory", name: "memory", solved: false, kind: 0 },
        { path: "oop", name: "oop", solved: false, kind: 0 },
        {
          path: "garbage_collector",
          name: "garbage collector",
          solved: false,
          kind: 0,
        },
        { path: "c", name: "c", solved: false, kind: 0 },
        { path: "c++", name: "c++", solved: false, kind: 0 },
        { path: "types", name: "types", solved: true, kind: 0 },
      ],
    },
  ]); */

  console.log("sections are", sections);
  if (sections.length === 0)
    setSections([{ title: "Subcategories", listing: [] }]);
  if (!isIndex && sections.length === 1 && sections[0].title !== "Exercises")
    setSections([sections[0], { title: "Exercises", listing: [] }]);
  if (sections.length === 1 && sections[0].title !== "Subcategories")
    setSections([sections[0], { title: "Subcategories", listing: [] }]);

  return (
    <>
      <Box
        display='flex'
        flexDirection='row'
        gap='20px'
        paddingLeft='10vw'>
        <Sidebar
          width='15vw'
          maxHeight='90vh'
          fontSize='15px'>
          {sections.map((section, idx) => {
            return (
              <SidebarListing
                key={`${section.title}:${idx}`}
                content={section.listing}
                title={section.title}
                makeIcon={makeSolvedIcon}
                makeTarget={(v) => v.path}
                inset
                canAdd={!isIndex}
                addTarget={section.title === "Subcategories" ? "/practice/@new" : `/practice/${current.path}/@new`}
              />
            );
          })}
        </Sidebar>
        <Box width='100%'>
          <Breadcrumbs
            maxItems={3}
            sx={{
              marginBottom: "50px",
            }}
            aria-label='breadcrumb'>
            <MUILink
              underline='hover'
              color='inherit'
              component={RouterLink}
              onClick={(e) => {
                setBreadcrumbs("");
              }}
              to='/practice'>
              Index
            </MUILink>
            {(() => {
              let path = "/practice/";
              const crumbs = breadcrumbs.split("-");
              return crumbs.length == 0 ||
                (crumbs.length == 1 && crumbs[0] === "")
                ? null
                : crumbs.map((crumb, idx) => {
                    let crumbHint = crumb.replace("_", " ");
                    crumbHint = crumbHint[0].toUpperCase() + crumbHint.slice(1);
                    path += (idx !== 0 ? "-" : "") + crumb;
                    if (idx < crumbs.length - 1) {
                      return (
                        <MUILink
                          key={`crumb-${crumb}-${idx}`}
                          underline='hover'
                          color='inherit'
                          component={RouterLink}
                          to={`${path}`}>
                          {crumbHint}
                        </MUILink>
                      );
                    } else {
                      return (
                        <Typography
                          key={`last-crumb`}
                          color='text.primary'>
                          {crumbHint}
                        </Typography>
                      );
                    }
                  });
            })()}
          </Breadcrumbs>
          <Outlet context={[setBreadcrumbs, setSections, setCurrent]} />
        </Box>
      </Box>
    </>
  );
}

export { default as ExercisePage } from "./exercise";
export { default as CategoryPage } from "./category";
