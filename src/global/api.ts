import axios, { AxiosError } from "axios";
import { generateAccessToken, logout } from "../services/auth";

const baseURL = "http://localhost:3000";

const http = axios.create({ baseURL });

http.interceptors.request.use(async (reqConfig) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    reqConfig.headers["Authorization"] = `bearer ${accessToken}`;
  }
  return reqConfig;
});

http.interceptors.response.use(
  async (resConfig) => {
    return resConfig;
  },
  async (error: AxiosError) => {
    if (error?.response) {
      if (error.response.status === 401) {
        const { data }: { data: any } = error.response;
        if (data && data?.responseData === "jwt expired") {
          try {
            const { responseData }: any = await generateAccessToken();
            if (responseData?.accessToken) {
              localStorage.setItem("accessToken", responseData.accessToken);
              const response = await http.request(error.config);
              return Promise.resolve(response);
            }
          } catch (apiError: any) {
            return Promise.reject(error);
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default http;
