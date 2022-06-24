import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AxRequestConfig } from "./type";

class AxRequest {
  instance: AxiosInstance;
  loading?: any;
  constructor(config: AxRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      config.interceptors.requestInterceptor,
      config.interceptors.requestErrorInterceptor
    );
    this.instance.interceptors.response.use(
      config.interceptors.responseInterceptor,
      config.interceptors.responseErrorInterceptor
    );
  }

  request<T = any>(config: AxRequestConfig): Promise<T | any> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: AxRequestConfig): Promise<T | any> {
    return this.request({ ...config, method: "get" });
  }

  post<T = any>(config: AxRequestConfig): Promise<T | any> {
    return this.request({ ...config, method: "post" });
  }
}

export default AxRequest;
