import { useCallback, useState, ReactNode, createContext } from 'react';

import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

import { api } from '../../services/api';

interface AuthContextProps {
  isAuthenticated: boolean;
  hasLoginFailed: boolean;
  username: string;
  handleLogin: (email: string, passwd: string) => void;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { replace } = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  const handleLogin = useCallback(async (email: string, passwd: string) => {
    try {
      setHasLoginFailed(false);
      const response = await api.post('/authenticate', {
        email,
        passwd,
      });

      setCookie(null, 'token', response.data.token, {
        maxAge: 30 * 24 * 60 * 60,
      });
      setCookie(null, 'userId', response.data.user._id);
      setCookie(null, 'name', response.data.user.name);
      setUsername(response.data.user.name);
      setIsAuthenticated(true);
    } catch (err) {
      setHasLoginFailed(true);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    replace('/');
  }, [replace]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout, hasLoginFailed, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};
