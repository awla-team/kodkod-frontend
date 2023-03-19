import {
  createContext,
  FC,
  useContext,
  PropsWithChildren,
  useReducer,
  useEffect,
} from "react";
import { AuthContextType } from "./interfaces";
import { getAuthUser as getAuthUserAction } from "services/users";
import Toaster from "utils/Toster";
import { User } from "services/users/interfaces";
import { useLocation, redirect, Navigate } from "react-router-dom";

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
  const [{ user, authenticated }, dispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
  });
  const { pathname } = useLocation();
  useEffect(() => {
    checkAuthUser();
  }, [pathname]);

  const checkAuthUser = async () => {
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
      if (error?.response?.status === 401) {
        Toaster("error", "Unauthorized access");
      } else {
        Toaster("error", error.message);
      }
      dispatch({
        type: "set__authenticatedFlag",
        payload: {
          authenticated: true,
        },
      });
    }
  };
  const getAuthUser = async (): Promise<Omit<User, "avatar">> => {
    try {
      const { data }: { data: { responseData: Omit<User, "avatar"> } } =
        await getAuthUserAction();
      return data.responseData;
    } catch (e) {
      throw e;
    }
  };

  if (authenticated && !user) {
    return <Navigate to={"/signin"} />;
  }
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
