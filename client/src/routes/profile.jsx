import React from "react";
import { useLoaderData } from "react-router-dom";

export function loader (apiClient)
{
  return async () =>
  {
    const user = await apiClient.get("/api/user");
    return { user };
  }
}


export function ProfilePage ()
{
  const { user } = useLoaderData();

  
}


export function EditProfilePage ()
{
  const { user } = useLoaderData();

}