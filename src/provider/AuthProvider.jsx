import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const value = {
    user,
    setUser,
    loading: true,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
