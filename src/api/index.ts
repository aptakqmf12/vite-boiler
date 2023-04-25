import axios, { AxiosError } from "axios";
import { requestAccessToken } from "./sign";
import { ResponseStatus, ResponseText } from "../types";

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

apiAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const error = err as AxiosError;
    if (error.message === ResponseText.TOKEN_EXPIRED) {
      await requestAccessToken();

      const originalResponse = await apiAuth.request(error.config!);
      return originalResponse.data.data;
    }
    return Promise.reject(err);
  }
);
