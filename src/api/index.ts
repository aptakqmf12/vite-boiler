import axios from "axios";
import { requestAccessToken } from "./sign";

const BASE_URL = import.meta.env.VITE_API_URL;

const defaultInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
  });
};

const authInstance = (options?: any) => {
  const accessToken = localStorage.getItem("access_token");

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...options,
    },
  });
};

authInstance().interceptors.request.use((req) => {
  console.log("auth 요청이므로 accessToken의 expire를 판단해야함");
  return req;
});

export const api = defaultInstance();
export const apiAuth = authInstance();
