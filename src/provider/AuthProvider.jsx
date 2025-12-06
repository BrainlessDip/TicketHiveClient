import { useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const value = {
    user,
    setUser,
    a: 12,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
