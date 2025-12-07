import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import auth from "./../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("dark")));
  const [loading, setLoading] = useState(true);

  const handleSignoutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRegister = async (email, password, displayName, photoURL) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName,
        photoURL,
      });

      setUser({
        ...result.user,
        displayName,
        photoURL,
      });
      toast.success("🎉 Your account has been successfully created!");
      return result;
    } catch (error) {
      switch (error.code) {
        case "auth/user-disabled":
          toast.error(
            "Your account has been disabled. Please contact support."
          );
          break;
        case "auth/popup-closed-by-user":
          toast.error("Sign-in cancelled. Please try again.");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. Check your connection and try again.");
          break;
        case "auth/email-already-in-use":
          toast.error(
            "This email is already registered. Please log in or use a different email."
          );
          break;
        default:
          toast.error(error.message);
          break;
      }
      return false;
    }
  };

  const handleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      return result;
    } catch (error) {
      switch (error.code) {
        case "auth/user-disabled":
          toast.error(
            "Your account has been disabled. Please contact support."
          );
          break;
        case "auth/popup-closed-by-user":
          toast.error("Sign-in cancelled. Please try again.");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. Check your connection and try again.");
          break;
        default:
          toast.error("An unexpected error occurred. Please try again later.");
          break;
      }
    }
  };

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
    handleSignin,
    handleRegister,
    handleSignoutUser,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
