import axios, { type AxiosError } from 'axios';
import { generateAccessToken } from './services/auth';
import { initMercadoPago } from '@mercadopago/sdk-react';

// TEST-c40bb3aa-a6a0-4b7c-b4d8-21423976a520
// FIXME: fix this eslint error
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_KEY, {
  locale: 'es-CL',
});

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const HEADERS: Readonly<Record<string, string>> = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};
const xsrfHeaderName: Readonly<string> = 'X-CSRFTOKEN';
const xsrfCookieName: Readonly<string> = 'csrftoken';
const withCredentials: Readonly<boolean> = true;

const http = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
  withCredentials,
  xsrfCookieName,
  xsrfHeaderName,
});

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
