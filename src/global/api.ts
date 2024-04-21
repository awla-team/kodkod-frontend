import axios, { type AxiosError } from 'axios';
import { generateAccessToken } from '../services/auth';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({ baseURL });

http.interceptors.request.use(async (reqConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    reqConfig.headers['Authorization'] = `bearer ${accessToken}`;
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
        if (data && data?.responseData === 'jwt expired') {
          try {
            const { responseData }: any = await generateAccessToken();
            if (responseData?.accessToken) {
              // FIXME: fix this eslint error
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              localStorage.setItem('accessToken', responseData.accessToken);
              // FIXME: fix this ts error
              // @ts-expect-error ts-error(2345)
              const response = await http.request(error.config);
              return await Promise.resolve(response);
            }
          } catch (apiError: any) {
            return await Promise.reject(error);
          }
        }
      }
    }
    return await Promise.reject(error);
  }
);

export default http;
