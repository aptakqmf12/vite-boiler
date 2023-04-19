import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

//test
const defaultInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
  });
};

const authInstance = (options?: any) => {
  const token = "token";
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer` + token,
      ...options,
    },
  });
};

export const interceptedApi = defaultInstance().interceptors.request.use(
  function (config) {
    config.baseURL += "/posts";
    return config;
  }
);

export const defaultApi = defaultInstance();
export const authApi = authInstance();
