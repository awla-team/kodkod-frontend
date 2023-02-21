import {
  createContext,
  FC,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { AuthContextType } from "./interfaces";
import { getAuthUser as getAuthUserAction } from "../../services/users";
import Toaster from "../../utils/Toster";
import { User } from "../../services/users/interfaces";

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuthUser();
  }, []);

  const getAuthUser = async () => {
    try {
      const { data }: { data: { responseData: Omit<User, "avatar"> } } =
        await getAuthUserAction();
      setUser(data.responseData);
    } catch (e: any) {
      Toaster("error", e.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
