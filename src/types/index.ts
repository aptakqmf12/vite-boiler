import config from "../../.storybook/main";
import { AxiosResponse } from "axios";

export interface GlobalType {
  id: number;
}

export interface ResponseData<T> {
  data: {
    result: T;
  };
  list: any;
  message: string;
  status: number;
  success: boolean;
}
export enum ResponseStatus {
  SUCCESS = 200,
  LOGIN_FAIL = 401,
  TOKEN_EXPIRED = 9999,
}
