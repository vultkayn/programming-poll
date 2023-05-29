import React, { useEffect } from "react";
import { useLoaderData, Outlet, Link, useFetcher } from "react-router-dom";
import "../components/styles/Sidebar.css";
import useAuth from "../bridge/AuthProvider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  Box,
  Divider,
  List,
  Chip,
  ListItemIcon,
  ListItemButton,
  Paper,
  ListItemText,
  Collapse,
} from "@mui/material";

function prepareCategoryTarget({ path, name, kind }) {
  const formatPath = (path) => {
    const pathBeg = path && path.length > 0 && path[0] === "/" ? 1 : 0;
    const pathEnd = // remove ending separator if any.
      path && path.length > 1 && path.endsWith("/")
        ? path.length - 1
        : path.length;
    return path
      .slice(pathBeg, pathEnd)
      .replaceAll(/[^a-zA-Z0-9-_/]/g, "")
      .replaceAll("-", "_")
      .replaceAll("/", "-");
  };

  const pureName = name.replaceAll(/[^\w ._,+-]/g, "");
  const pureNameURI = pureName
    .replaceAll(/[^a-zA-Z0-9-+_ ]/g, "")
    .replaceAll("-", "_")
    .replaceAll(" ", "_");

  const uri = formatPath(path);

  let sep = null;
  if (kind === 0) sep = uri.length === 0 /* root? */ ? "" : "-";
  else if (kind === 1) sep = uri.length === 0 /* root? */ ? null : "/"; // no exercises allowed for root, so cannot have empty here
  if (sep === null) sep = ""; //throw new Error(""); // TODO improved the error type

  console.log({ target: uri + sep + pureNameURI, uiName: pureName });
  return { target: uri + sep + pureNameURI, uiName: pureName };
}

function SidebarListing({
  title = "",
  content,
  onClick = (e, idx) => {},
  ...ListProps
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [opened, setOpened] = React.useState(true);
  const handleClick = (e, idx) => {
    setSelectedIndex(idx);
    onClick(e, idx);
  };

  const handleCollapse = (e) => setOpened(!opened);

  return (
    <List
      className='Sidebar-content SidebarListing'
      style={{ overflow: "auto" }}
      {...ListProps}>
      <Divider variant='middle'>
        {title ? (
          <Chip
            label={title}
            clickable
            color='secondary'
            variant={opened ? "outlined" : "filled"}
            onClick={handleCollapse}
          />
        ) : null}
      </Divider>
      <Collapse in={opened}>
        {content.map(({ path, name, solved, kind }, idx) => {
          const { target, uiName } = prepareCategoryTarget({
            path,
            name,
            kind,
          });

          return (
            <ListItemButton
              component={Link}
              selected={selectedIndex === idx}
              onClick={(e) => handleClick(e, idx)}
              key={target}
              to={target}>
              <ListItemText
                primary={uiName}
                className='SidebarListing-item'
                inset
              />
              {solved ? (
                <ListItemIcon>
                  {" "}
                  <CheckCircleIcon htmlColor='green' />
                </ListItemIcon>
              ) : null}
            </ListItemButton>
          );
        })}
      </Collapse>
    </List>
  );
}

function Sidebar({ elevation = 1, children, ...BoxProps }) {
  const props = {
    height: "100%",
    flexGrow: "auto",
    paddingtop: "10px",
    paddingbot: "10px",
    overflow: "scroll",
    scrollbarwidth: "thin",
    ...BoxProps,
  };

  return (
    <Box {...props}>
      <Paper
        elevation={elevation}
        square
        style={{
          display: "flex",
          flexDirection: "column",
        }}>
        {children}
      </Paper>
    </Box>
  );
}

export default function CategoriesListingPage() {
  // const {currentInfo, subCategories, exercises} = useLoaderData();
  const [current, setCurrent] = React.useState({
    kind: 0, // 0 for catgs, 1 for exercises
    path: "/", // object path, from root supercategory /.
    solved: false,
    progress: 4 /*
    kind==1 then between 0 and questionIDs.length-1
    kind==0 then between 0 and exercises.length -1
    */,

    // Categories specific infos:

    // Exercises specific infos:
    questionIDs: [], // used to fetch the questions
    nbAttempts: 0,
    lastAttemptDate: "",
  });
  const [sections, setSections] = React.useState([
    {
      title: "Exercises",
      listing: [
        { path: "memory/pointers", name: "exo1", solved: false, kind: 1 },
        { path: "memory-pointers", name: "exo2", solved: false, kind: 1 },
        { path: "pointers", name: "exo3", solved: false, kind: 1 },
        { path: "memory", name: "exo4", solved: false, kind: 1 },
        { path: "c++", name: "exo12", solved: false, kind: 1 },
        { path: "memory", name: "exercise5", solved: false, kind: 1 },
        { path: "memory", name: "exo5", solved: false, kind: 1 },
        { path: "garbage_collector", name: "exo46", solved: false, kind: 1 },
        { path: "oop", name: "exo6", solved: false, kind: 1 },
      ],
    },
    {
      title: "Subcategories",
      listing: [
        { path: "", name: "pointers", solved: false, kind: 0 }, // FIXME path should include name too, fix above in the functions too
        { path: "", name: "memory", solved: false, kind: 0 },
        { path: "", name: "oop", solved: false, kind: 0 },
        { path: "", name: "garbage collector", solved: false, kind: 0 },
        { path: "", name: "c", solved: false, kind: 0 },
        { path: "", name: "c++", solved: false, kind: 0 },
        { path: "", name: "types", solved: true, kind: 0 },
        { path: "", name: "pointers", solved: false, kind: 0 },
        { path: "", name: "memory", solved: false, kind: 0 },
        { path: "", name: "oop", solved: false, kind: 0 },
        { path: "", name: "garbage collector", solved: false, kind: 0 },
        { path: "", name: "c", solved: false, kind: 0 },
        { path: "", name: "c++", solved: false, kind: 0 },
        { path: "", name: "types", solved: false, kind: 0 },
      ],
    },
  ]);

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
          {sections.map((section) => {
            return (
              <SidebarListing
                key={section.title}
                content={section.listing}
                title={section.title}
              />
            );
          })}
        </Sidebar>
        <Outlet context={[setCurrent, setSections]} />
      </Box>
    </>
  );
}
