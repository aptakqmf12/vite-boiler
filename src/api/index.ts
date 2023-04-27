import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { requestAccessToken } from "./sign";
import { ResponseStatus, ResponseCode, ResponseData } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

const defaultInstance = () => {
  return axios.create({
    // baseURL: BASE_URL,
  });
};

const authInstance = (options?: any) => {
  const accessToken = localStorage.getItem("access_token");

  return axios.create({
    timeout: 5000,
    // withCredentials: true,
    // baseURL: BASE_URL,
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

    if (response.data.message !== ResponseCode.TOKEN_EXPIRED) return;

    const res = await requestAccessToken();

    if (res.success === true) return await apiAuth.request(config);

    return Promise.reject(err);
  }
);

// error
export const dispatchError = (error: AxiosError<ResponseData<any>>) => {
  switch (error.response?.data.message) {
    case ResponseCode.INVALID_CREDENTIALS:
      return console.log("인증 실패");

    case ResponseCode.ACCOUNT_LOCKED:
      return console.log("계정 잠김");

    case ResponseCode.ACCOUNT_DISABLED:
      return console.log("계정 비활성화됨");

    case ResponseCode.UNRELIABLE_TOKEN:
      return console.log("토큰 위변조됨");

    case ResponseCode.UNKNOWN_REFRESH_TOKEN:
      return console.log("매칭되는 Refresh Token이 없음");

    case ResponseCode.INVALID_TOKEN:
      return console.log("잘못된 토큰");

    case ResponseCode.GET_TOKEN_FAILED:
      return console.log("Bearer 빠진듯?");

    case ResponseCode.TOKEN_EXPIRED:
      return console.log("Access Token 만료");

    case ResponseCode.EXPIRED_REFRESH_TOKEN:
      return console.log("Refresh Token 만료");

    case ResponseCode.INVALID_REQUEST:
      return console.log(
        "일반 요청에 RefreshToken을 받았거나 인증 중 서버오류"
      );

    case ResponseCode.UNKNOWN_EXCEPTION:
      return console.log("알 수 없는 오류");
  }
};
