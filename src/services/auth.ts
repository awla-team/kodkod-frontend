import { type AxiosError } from 'axios';
import http from 'global/api';

export interface SignInBody {
  email: string;
  password: string;
}

export interface GenerateAccessTokenBody {
  refreshToken: string;
}

export interface LogoutBody extends GenerateAccessTokenBody {}

export const signIn = async (body: SignInBody) => {
  return await http.post('/auth/sign-in', body);
};

export const logout = async (body: LogoutBody) => {
  return await http.post('/auth/logout', body);
};

export const generateAccessToken = async (body?: GenerateAccessTokenBody) => {
  // FIXME: fix this eslint error
  // eslint-disable-next-line no-async-promise-executor
  return await new Promise(async (resolve, reject) => {
    let refreshToken: string;
    if (!body) {
      // FIXME: fix this ts error
      // @ts-expect-error ts-error(2322)
      refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        // FIXME: fix this eslint error
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ reason: 'refreshTokenNull' });
      }
    }

    http
      .post(
        '/auth/generate-access-token',
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2454)
        { ...(body ? { refreshToken: body.refreshToken } : { refreshToken }) },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        if (response?.status === 200 && !!response?.data)
          return resolve(response.data);
        // FIXME: fix this eslint error
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw response;
      })
      .catch(async (error: AxiosError) => {
        try {
          // FIXME: fix this ts error
          // @ts-expect-error ts-error(18048)
          const data: any = await error.response.data;
          if (
            data?.responseData === 'refreshToken expired' &&
            data?.responseCode === 401
          ) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              await logout({ refreshToken });
              localStorage.clear();
            }
          }
          reject(error);
        } catch (e) {
          reject(error);
        }
      });
  });
};

export const forgotPassword = async (body: { email: string }) => {
  return await http.post('/auth/forgot-password', body);
};

export const verifyResetToken = async (token: string) => {
  return await http.get('/auth/verify-token/' + token);
};

export const resetPassword = async (
  body: Omit<SignInBody, 'email'>,
  token: string
) => {
  return await http.post('/auth/reset-password/' + token, body);
};

export const verifyEmail = async (token: string) => {
  return await http.get(`/auth/verify-email/${token}`);
};

export const resendEmailVerification = async (userId: number | string) => {
  return await http.get(`/auth/send-email-verification/${userId}`);
};
