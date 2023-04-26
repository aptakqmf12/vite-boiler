import axios, { AxiosError, AxiosRequestConfig } from "axios";
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
    timeout: 5000,
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
    const { response, config } = err;

    if (response.data.message === ResponseText.TOKEN_EXPIRED) {
      const res = await requestAccessToken();

      if (res.success === true) {
        const res = await apiAuth.request(config);
        return res;
      }
    }
    return Promise.reject(err);
  }
);
