import { useCallback, useState, ReactNode, createContext, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
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
  handleLoading: (active: boolean) => void;
  callAlert: () => void;
  handleAlertMessage: (text: string, isError: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { replace } = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const callAlert = useCallback(() => {
    setShowAlert((oldShow) => !oldShow);
  }, []);

  const handleAlertMessage = useCallback((text: string, isError: boolean) => {
    setAlertMessage(text);
    setIsError(isError);
  }, []);

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
          secure: true
        });
        setCookie(null, 'userId', response.data.user._id, {
          secure: true
        });
        setCookie(null, 'name', response.data.user.name, {
          secure: true
        });
        setUsername(response.data.user.name);
        setToken(response.data.token);
        setIsAuthenticated(true);
        replace('/writer-area');
        setIsLoading(false);
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

  const handleLoading = useCallback((active: boolean) => {
    setIsLoading(active);
  }, []);

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
        handleLoading,
        callAlert,
        handleAlertMessage,
        username,
        token,
      }}
    >
      <CustomBackdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </CustomBackdrop>
      {children}
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={callAlert}>
        <Alert severity={isError ? 'error' : 'success'}>
          {alertMessage}
          {/* Alguns dados estão faltando ou estão em formato errado! */}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};
