import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  timeout: 5000,
});

const useAxios = () => {
  return instance;
};

export default useAxios;
