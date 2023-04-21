import axios from "axios";
import { requestAccessToken } from "./sign";
import { ResponseStatus } from "../types";

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

export const api = defaultInstance();
export const apiAuth = authInstance();

apiAuth.interceptors.response.use((res) => {
  if (res.status === ResponseStatus.TOKEN_EXPIRED) {
    // requestAccessToken
  }

  return res;
});
