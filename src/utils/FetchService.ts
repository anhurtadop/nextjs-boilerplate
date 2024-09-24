import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { call } from 'redux-saga/effects';

// TODO: SETUP THIS URL
const API_URL = process.env.REST_URL ?? 'http://worldclockapi.com/api';

export type ApiResponse<T = never> = {
  ok: boolean;
  data?: T;
  message?: string;
};

function* FetchService<ResponseData, RequestData = unknown>(
  url: string,
  method: Method = 'GET',
  auth?: string,
  data: RequestData = {} as RequestData,
  queryParams?: { [key: string]: string }
): Generator<unknown, ApiResponse<ResponseData>, never> {
  try {
    const requestConfig: AxiosRequestConfig<typeof data> = {
      method: method,
      data,
      params: queryParams,
      headers: {
        'Content-Type': 'application/json',
        ...(auth
          ? {
              Authorization: `Bearer ${auth}`,
            }
          : {}),
      },
    };

    const response = (yield call(axios, `${API_URL}/${url}`, requestConfig)) as AxiosResponse<ResponseData>;
    return {
      ok: true,
      data: response.data,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      const message = err.response?.data?.message ?? err.message;
      return {
        ok: false,
        data: err.response?.data,
        message,
      };
    }
    return {
      ok: false,
      message: (err as Error)?.message ?? String(err),
    };
  }
}

export default FetchService;
