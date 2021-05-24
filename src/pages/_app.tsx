import { useState } from 'react';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import { Header } from '../components/Header';
import { Topics } from '../components/Topics';
import GlobalStyle from '../styles/global';
import { Main } from '../styles/pages/App';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
    console.log(theme);
  };

  return (
    <ThemeProvider theme={theme}>
      {pathname !== '/login' && (
        <>
          <Header toggleTheme={toggleTheme} />
          <Topics />
        </>
      )}
      <Main login={pathname === '/login'}>
        <Component {...pageProps} />
      </Main>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
