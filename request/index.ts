import AxRequest from "./request";

const axRequest = new AxRequest({
  baseURL: "/",
  interceptors: {
    requestInterceptor: (config) => {
      return config;
    },
    responseInterceptor: (res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return res;
      }
    },
    responseErrorInterceptor(error) {
      throw error;
    },
  },
});

export default axRequest;
