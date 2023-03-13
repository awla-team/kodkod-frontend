import axios from "axios";

const baseURL = "http://localhost:3000";

const http = axios.create({ baseURL });

http.interceptors.request.use(async (reqConfig) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    reqConfig.headers["Authorization"] = `bearer ${accessToken}`;
  }
  return reqConfig;
});

http.interceptors.response.use(async (resConfig) => {
  return resConfig;
});

export default http;
