import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import { Header } from '../components/Header';
import { Topics } from '../components/Topics';
import GlobalStyle from '../styles/global';
import { Main } from '../styles/pages/App';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <ThemeProvider theme={theme}>
      {pathname !== '/login' && (
        <>
          <Header />
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
