import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  timeout: 5000,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const interceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    return () => {
      instance.interceptors.request.eject(interceptor);
    };
  }, [user]);

  return instance;
};

export default useAxiosSecure;
