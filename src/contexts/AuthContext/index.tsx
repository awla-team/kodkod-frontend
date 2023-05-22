import {
  createContext,
  FC,
  useContext,
  PropsWithChildren,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { AuthContextType } from './interfaces';
import { getAuthUser as getAuthUserAction } from 'services/users';
import Toaster from 'utils/Toster';
import { IUser } from 'global/interfaces';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { logout as makeLogout } from 'services/auth';
import SubscribeModal from 'components/Modals/SubscribeModal';

// const publicRoutes = ["/signin", "/signup", "/reset-password"];
const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  checkUserSubscription: () => {},
});

export const useAuth = () => useContext(AuthContext);

const reducer = (
  state: any,
  action: { type: 'user__action' | 'set__authenticatedFlag'; payload?: any }
) => {
  switch (action.type) {
    case 'user__action': {
      if (action.payload) {
        return { ...state, ...action.payload };
      }
      return state;
    }
    case 'set__authenticatedFlag': {
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
  const [subscribeModalOpen, setSubscribeModalOpen] = useState<{ open: boolean; reason: string }>({
    open: false,
    reason: 'Conviertete un miembro Pro',
  });

  const getAuthUser = async (): Promise<Omit<IUser, 'avatar'>> => {
    try {
      const { data }: { data: { responseData: Omit<IUser, 'avatar'> } } = await getAuthUserAction();
      return data.responseData;
    } catch (e) {
      throw e;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await makeLogout({ refreshToken });
        localStorage.clear();
        navigate('/signin', { replace: true });
        dispatch({
          type: 'user__action',
          payload: {
            user: null,
            authenticated: false,
          },
        });
      }
    } catch (error: any) {
      console.error(error);
      localStorage.clear();
      dispatch({
        type: 'user__action',
        payload: {
          user: null,
          authenticated: false,
        },
      });
      navigate('/signin', { replace: true });
      Toaster('error', 'Hubo un error al cerrar sesión');
    }
  };

  const goToSignin = useCallback(() => {
    dispatch({
      type: 'user__action',
      payload: {
        user: null,
        authenticated: false,
      },
    });
    localStorage.clear();
    navigate('/signin', { replace: true });
  }, [navigate]);

  const checkAuthUser = useCallback(async () => {
    try {
      if (user) {
        return;
      }
      const userData = await getAuthUser();
      dispatch({
        type: 'user__action',
        payload: {
          user: userData,
          authenticated: true,
        },
      });
    } catch (error: any) {
      dispatch({
        type: 'user__action',
        payload: {
          user: null,
          authenticated: false,
        },
      });
      if (error?.response?.status === 401) Toaster('error', 'Tu sesión ha caducado');
      else Toaster('error', 'Ha ocurrido un error en tu sesión');
      goToSignin();
    }
  }, [goToSignin, user]);

  const checkUserSubscription = (reason: string, callback: () => void) => {
    if (!user.is_subscription_active) setSubscribeModalOpen({ open: true, reason });
    else callback();
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken && pathname.includes('app')) checkAuthUser();
  }, [pathname, checkAuthUser, goToSignin]);

  if (localStorage.getItem('accessToken') && pathname === '/') {
    return <Navigate to="/app" />;
  }

  if (!localStorage.getItem('accessToken') && pathname === '/') {
    return <Navigate to="/signin" />;
  }

  return (
    <AuthContext.Provider value={{ user, logout, checkUserSubscription }}>
      {children}
      <SubscribeModal
        open={subscribeModalOpen.open}
        reason={subscribeModalOpen.reason}
        onClose={() => setSubscribeModalOpen({ ...subscribeModalOpen, open: false })}
      />
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
