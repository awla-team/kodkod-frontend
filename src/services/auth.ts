import { AxiosError } from 'axios';
import http from 'global/api';

export interface SignInBody {
  email: string;
  password: string;
}

export interface GenerateAccessTokenBody {
  refreshToken: string;
}

export interface LogoutBody extends GenerateAccessTokenBody {}

export interface SignUpBody extends SignInBody {
  first_name: string;
  last_name: string;
  confirmPassword: string;
  school: number | string;
  subject: string;
}

export const signIn = (body: SignInBody) => {
  return http.post('/auth/sign-in', body);
};

export const logout = (body: LogoutBody) => {
  return http.post('/auth/logout', body);
};

export const signUp = (body: Omit<SignUpBody, 'confirmPassword'>) => {
  return http.post('/auth/signup', body);
};

export const generateAccessToken = async (body?: GenerateAccessTokenBody) => {
  return new Promise(async (resolve, reject) => {
    let refreshToken: string;
    if (!body) {
      refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return reject({ reason: 'refreshTokenNull' });
      }
    }

    http
      .post(
        '/auth/generate-access-token',
        { ...(body ? { refreshToken: body.refreshToken } : { refreshToken }) },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        if (response?.status === 200 && !!response?.data) return resolve(response.data);
        throw response;
      })
      .catch(async (error: AxiosError) => {
        try {
          const data: any = await error.response.data;
          if (data?.responseData === 'refreshToken expired' && data?.responseCode === 401) {
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

export const forgotPassword = (body: { email: string }) => {
  return http.post('/auth/forgot-password', body);
};

export const verifyResetToken = (token: string) => {
  return http.get('/auth/verify-token/' + token);
};

export const resetPassword = (body: Omit<SignInBody, 'email'>, token: string) => {
  return http.post('/auth/reset-password/' + token, body);
};

export const verifyEmail = (token: string) => {
  return http.get(`/auth/verify-email/${token}`);
};

export const resendEmailVerification = (userId: number | string) => {
  return http.get(`/auth/send-email-verification/${userId}`);
};
