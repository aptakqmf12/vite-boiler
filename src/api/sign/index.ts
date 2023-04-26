import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";
import { parseAccessToken } from "../../lib/token";
import type { ResponseData } from "../../types";
import { ResponseStatus } from "../../types";
import { encrypt, decrypt } from "../../lib/encrypt";
import { api, apiAuth } from "..";
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
  return await api
    .post(`/auth/authenticate`, { username, password })
    .then((res: AxiosResponse<ResponseData<LoginResponse>>) => {
      if (res.status === ResponseStatus.SUCCESS) {
        console.log(res);
        const { accessToken, refreshToken } = res.data.data.result;
        setStorageAndHeaderByToken(accessToken, refreshToken);
      } else if (res.status === ResponseStatus.LOGIN_FAIL) {
        alert("로그인 정보가 틀립니다.");
      } else {
        throw new Error();
      }

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
        const { accessToken, refreshToken } = res.data.data.result;
        setStorageAndHeaderByToken(accessToken, refreshToken);
      } else {
        // 로그아웃을 시켜야할수도
        console.log("토큰갱신 실패");
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
      axios.defaults.headers.delete["Authorization"];
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_info");
    });
};

export const testApi = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };

  return await apiAuth
    .post(`/v1/test`, undefined, { headers })
    .then((res: AxiosResponse<ResponseData<any>>) => {
      console.log("test 완료");
    });
};
