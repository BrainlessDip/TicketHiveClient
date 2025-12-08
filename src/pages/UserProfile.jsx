import React from "react";
import useAuth from "../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();
  return (
    <>
      <h1>{user.email}</h1>
    </>
  );
};

export default UserProfile;
