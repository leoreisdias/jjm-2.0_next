import { useState } from 'react';

import { useMediaQuery } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Parallax } from 'react-parallax';
import { ThemeProvider } from 'styled-components';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { LoadingRouteChange } from '../components/LoadingRouteChange';
import { Topics } from '../components/Topics';
import { AuthProvider } from '../context/AuthContext';
import GlobalStyle from '../styles/global';
import { Main, ParallaxPageOne } from '../styles/pages/App';
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
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          {pathname == '/' && (
            <Parallax
              blur={{ min: -15, max: 15 }}
              bgImage={'/bgJJM.png'}
              bgImageAlt="the dog"
              strength={100}
              bgImageStyle={{ opacity: 0.9 }}
              style={{ boxShadow: 'inset 0 0 0 2000px rgba(255, 0, 150, 0.3)' }}
            >
              <ParallaxPageOne style={{ height: '100vh' }}>
                <Image src={'/logo.png'} width={150} height={150} objectFit="contain" />
                <strong>Na Pura Verdade Junto de Você!</strong>
              </ParallaxPageOne>
            </Parallax>
          )}
          <Parallax>
            {pathname !== '/login' && (
              <>
                <Header toggleTheme={toggleTheme} />
                <Topics />
              </>
            )}
            <Main login={pathname === '/login'}>
              <Component {...pageProps} />
            </Main>
            <LoadingRouteChange />
            {pathname !== '/login' && !matches && <Footer />}
          </Parallax>
        </AuthProvider>
        <GlobalStyle />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default MyApp;
