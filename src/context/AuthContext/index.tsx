import { useCallback, useState, ReactNode, createContext, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { api } from '../../services/api';
import { CustomBackdrop } from '../ContextStyle';

interface AuthContextProps {
  isAuthenticated: boolean;
  hasLoginFailed: boolean;
  username: string;
  token: string;
  handleLogin: (email: string, passwd: string) => void;
  handleLogout: () => void;
  handleLoginFailed: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { replace } = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  const handleLoginFailed = useCallback(() => {
    setHasLoginFailed(false);
  }, []);

  const handleLogin = useCallback(
    async (email: string, passwd: string) => {
      try {
        setIsLoading(true);
        setHasLoginFailed(false);
        const response = await api.post('/authenticate', {
          email,
          passwd,
        });

        setCookie(null, 'token', response.data.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 Days
        });
        setCookie(null, 'userId', response.data.user._id);
        setCookie(null, 'name', response.data.user.name);
        setUsername(response.data.user.name);
        setToken(response.data.token);
        setIsAuthenticated(true);
        setIsLoading(false);
        replace('/writer-area');
      } catch (err) {
        setIsLoading(false);
        setHasLoginFailed(true);
      }
    },
    [replace]
  );

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    destroyCookie(null, 'userId');
    destroyCookie(null, 'name');
    destroyCookie(null, 'token');
    setUsername('');

    replace('/');
  }, [replace]);

  useEffect(() => {
    const { token: userToken } = parseCookies();

    if (userToken) {
      const { name: username } = parseCookies();
      setToken(userToken);
      setUsername(username);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
        handleLoginFailed,
        handleLogout,
        hasLoginFailed,
        username,
        token,
      }}
    >
      <CustomBackdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </CustomBackdrop>
      {children}
    </AuthContext.Provider>
  );
};
