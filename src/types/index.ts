import config from "../../.storybook/main";
import { AxiosResponse } from "axios";

export interface ResponseData<T> {
  data: T;
  list: any;
  message: string;
  status: number;
  success: boolean;
}
export enum ResponseStatus {
  SUCCESS = 200,
  LOGIN_FAIL = 401,
}

export enum ResponseCode {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS", // 인증 실패
  ACCOUNT_LOCKED = "ACCOUNT_LOCKED", // 계정 잠김
  ACCOUNT_DISABLED = "ACCOUNT_DISABLED", // 계정 비활성화됨
  UNRELIABLE_TOKEN = "UNRELIABLE_TOKEN", // 토큰 위변조됨
  UNKNOWN_REFRESH_TOKEN = "UNKNOWN_REFRESH_TOKEN", // 매칭되는 Refresh Token이 없음
  INVALID_TOKEN = "INVALID_TOKEN", // 잘못된 토큰
  GET_TOKEN_FAILED = "GET_TOKEN_FAILED", // Bearer 빠진듯?
  TOKEN_EXPIRED = "TOKEN_EXPIRED", // Access Token 만료
  EXPIRED_REFRESH_TOKEN = "INVALID_CREDENTIALS", // Refresh Token 만료
  INVALID_REQUEST = "INVALID_REQUEST", // 일반 요청에 RefreshToken을 받았거나 인증 중 서버오류
  UNKNOWN_EXCEPTION = "UNKNOWN_EXCEPTION", // 알 수 없는 오류
}

export enum UserRole {
  ADMIN = "ADMIN",
  SITE_USER = "SITE_USER",
  WORKER = "WORKER",
}
