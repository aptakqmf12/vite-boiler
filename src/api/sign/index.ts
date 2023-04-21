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

export const requestLogin = async ({ username, password }: LoginRequest) => {
  return await api
    .post(`/auth/authenticate`, { username, password })
    .then((res: AxiosResponse<ResponseData<LoginResponse>>) => {
      if (res.status === ResponseStatus.SUCCESS) {
        const { accessToken, refreshToken } = res.data.data.result;
        setStorageAndHeaderByToken(accessToken, refreshToken);
      } else if (res.status === ResponseStatus.LOGIN_FAIL) {
        alert("로그인 정보가 틀립니다.");
      } else {
        console.log("error");
      }

      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return "catched error";
    });
};

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const requestAccessToken = async () => {
  console.log("requestAccessToken");
  return await apiAuth
    .post(`/auth/getAccessToken`, undefined, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
      },
    })
    .then((res: AxiosResponse<ResponseData<RefreshResponse>>) => {
      if (res.status === ResponseStatus.SUCCESS) {
        const { accessToken, refreshToken } = res.data.data.result;
        setStorageAndHeaderByToken(accessToken, refreshToken);
      } else {
      }
    });
};

const setStorageAndHeaderByToken = (
  accessToken: string,
  refreshToken: string
) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  const {
    exp: key,
    n: name,
    cc: campanyCode,
    dc: deptCode,
    ut: userType,
  } = parseAccessToken(accessToken);

  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem(
    "user_info",
    JSON.stringify({ key, name, campanyCode, deptCode, userType })
  );
};
