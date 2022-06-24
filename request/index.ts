import AxRequest from "./request";

const axRequest = new AxRequest({
  baseURL: "/",
  interceptors: {
    requestInterceptor: (config) => {
      console.log(config);
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
      console.log(error);
    },
  },
});

export default axRequest;
