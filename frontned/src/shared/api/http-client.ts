import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";

export const AXIOS_INSTANCE = axios.create({
  baseURL: "",
});

export const customInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source();

  const response = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  response.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return response;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
