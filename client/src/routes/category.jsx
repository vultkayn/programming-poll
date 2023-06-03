import React, { useEffect } from "react";
import { useOutletContext, useLocation } from "react-router-dom";

export function CategoryLoader (auth) {
  return ({ params }) => {
    const uri = params.uri;
    console.log(uri);
    if (!uri || uri.length == 0)
      return auth.send({
        method: 'get',
        url: `/api/practice/category/${uri}`
      });
    return auth.send({
      method: 'get',
      url: `/api/practice/category/${uri}`
    });
  };
}

export default function CategoryPage() {
  const [setBreadcrumbs, setSections] = useOutletContext();
  const path = useLocation().pathname.replace("/practice/", "");

  const sections = [
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
  ];

  useEffect(() => {
    setSections(sections);
    setBreadcrumbs(path.endsWith("/") ? path.slice(0, -1) : path);
  }, [useLocation().pathname]);

  return <div>Category</div>;
}
