import { useState } from 'react';

import { useMediaQuery } from '@material-ui/core';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Topics } from '../components/Topics';
import { AuthProvider } from '../context/AuthContext';
import GlobalStyle from '../styles/global';
import { Main } from '../styles/pages/App';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [theme, setTheme] = useState(light);
  const matches = useMediaQuery('(max-width:720px)');

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {pathname !== '/login' && (
          <>
            <Header toggleTheme={toggleTheme} />
            <Topics />
          </>
        )}
        <Main login={pathname === '/login'}>
          <Component {...pageProps} />
        </Main>
        {pathname !== '/login' && !matches && <Footer />}
      </AuthProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
