import React from "react";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const user = await getUser(params.id);
  return { user };
}


export default function ProfilePage () {
  const { user } = useLoaderData();

  

}