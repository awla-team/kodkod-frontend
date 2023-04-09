import {
  createContext,
  FC,
  useContext,
  PropsWithChildren,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { AuthContextType } from "./interfaces";
import { getAuthUser as getAuthUserAction } from "services/users";
import Toaster from "utils/Toster";
import { User } from "services/users/interfaces";
import { useLocation, useNavigate } from "react-router-dom";

const publicRoutes = ["/signin", "/signup", "/reset-password"];
const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);

const reducer = (
  state: any,
  action: { type: "user__action" | "set__authenticatedFlag"; payload?: any }
) => {
  switch (action.type) {
    case "user__action": {
      if (action.payload) {
        return { ...state, ...action.payload };
      }
      return state;
    }
    case "set__authenticatedFlag": {
      if (action.payload) {
        return { ...state, ...action.payload };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
  });

  const getAuthUser = async (): Promise<Omit<User, "avatar">> => {
    try {
      const { data }: { data: { responseData: Omit<User, "avatar"> } } =
        await getAuthUserAction();
      return data.responseData;
    } catch (e) {
      throw e;
    }
  };

  const goToSignin = useCallback(() => {
    dispatch({
      type: "user__action",
      payload: {
        user: null,
        authenticated: false,
      },
    });
    localStorage.clear();
    navigate("/signin", { replace: true });
  }, [navigate]);

  const checkAuthUser = useCallback(async () => {
    try {
      if (user) {
        return;
      }
      if (publicRoutes.includes(pathname)) {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          return;
        }
      }
      const userData = await getAuthUser();
      dispatch({
        type: "user__action",
        payload: {
          user: userData,
          authenticated: true,
        },
      });
    } catch (error: any) {
      if (error?.response?.status === 401)
        Toaster("error", "Unauthorized access");
      else Toaster("error", error.message);
      goToSignin();
    }
  }, [goToSignin, pathname, user]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) checkAuthUser();
    else if (!pathname.includes("app")) goToSignin();
  }, [pathname, checkAuthUser, goToSignin]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
