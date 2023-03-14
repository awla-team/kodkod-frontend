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

export const generateAccessToken = async (body?: GenerateAccessTokenBody) => {
  return new Promise(async (resolve, reject) => {
    let refreshToken: string;
    if (!body) {
      refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return reject({ reason: "refreshTokenNull" });
      }
    }

    const data = await fetch(
      "http://localhost:3000/auth/generate-access-token",
      {
        method: "post",
        body: JSON.stringify({
          ...(body ? { refreshToken: body.refreshToken } : { refreshToken }),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          res.json();
        }
        throw res;
      })
      .then((data) => resolve(data))
      .catch(async (error) => {
        try {
          const data = await error.json();
          if (
            data?.responseData === "refreshToken expired" &&
            data?.responseCode === 401
          ) {
            const refreshToken = localStorage.getItem("refreshToken");
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
  return http.post("/auth/forgot-password", body);
};
