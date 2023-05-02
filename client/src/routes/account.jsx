import React from "react";
import { useLoaderData } from "react-router-dom";
import { getUser } from "../bridge/account";

export async function loader({ params }) {
  const user = await getUser(params.id);
  return { user };
}


export function ProfilePage () {
  const { user } = useLoaderData();

  
}


export function EditProfilePage () {
  const { user } = useLoaderData ();

  

}