import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";
import { parseAccessToken } from "../../lib/token";
import { ResponseData, ResponseCode } from "../../types";
import { ResponseStatus } from "../../types";
import { encrypt, decrypt } from "../../lib/encrypt";
import { api, apiAuth, dispatchError } from "..";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const setStorageAndHeaderByToken = (
  accessToken: string,
  refreshToken: string
) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem(
    "user_info",
    JSON.stringify(parseAccessToken(accessToken))
  );
};

// api
export const requestLogin = async ({ username, password }: LoginRequest) => {
  return await axios
    .post(`/api/auth/authenticate`, { username, password })
    .then((res: AxiosResponse<ResponseData<LoginResponse>>) => {
      return res.data;
    });
};

export const requestAccessToken = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
  };

  return await apiAuth
    .post(`/auth/getAccessToken`, undefined, { headers })
    .then((res: AxiosResponse<ResponseData<RefreshResponse>>) => {
      if (res.status === ResponseStatus.SUCCESS) {
        const { accessToken, refreshToken } = res.data.data;
        setStorageAndHeaderByToken(accessToken, refreshToken);
      }

      return res.data;
    });
};

export const requestLogout = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
  };

  return await apiAuth
    .post(`/auth/logout`, undefined, { headers })
    .then((res: AxiosResponse<ResponseData<any>>) => {
      return res.data;
    });
};

export const testApi = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };

  return await apiAuth
    .get(`/api/test/test`, {
      headers,
    })
    .then((res: AxiosResponse<ResponseData<any>>) => {
      console.log("test 완료");
    });
};
