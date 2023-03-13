import http from "global/api";

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
  return http.post("/auth/sign-in", body);
};

export const logout = (body: LogoutBody) => {
  return http.post("/auth/logout", body);
};

export const signUp = (body: SignUpBody) => {
  return http.post("/auth/signup", body);
};

export const generateAccessToken = (body: GenerateAccessTokenBody) => {
  return http.post("/auth/generate-access-token", body);
};
