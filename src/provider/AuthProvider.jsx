import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import auth from "./../firebase/firebase.init";
import { onAuthStateChanged } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("dark")));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    setUser,
    setTheme,
    loading,
    theme,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
