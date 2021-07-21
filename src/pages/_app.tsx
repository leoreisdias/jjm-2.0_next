import { useState } from 'react';

import { useMediaQuery } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { AnimatePresence } from 'framer-motion';
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

const Variant = {
  begin: {
    scale: 2,
    y: 30,
    opacity: 0,
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};

const MainVariant = {
  begin: {
    scale: 0.8,
    y: 30,
    opacity: 0,
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [theme, setTheme] = useState(light);
  const matches = useMediaQuery('(max-width:720px)');

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <StylesProvider injectFirst>
      <AnimatePresence exitBeforeEnter>
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
                <ParallaxPageOne
                  style={{ height: '100vh' }}
                  initial="begin"
                  animate="animate"
                  variants={Variant}
                >
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
              <Main
                login={pathname === '/login'}
                initial="begin"
                animate="animate"
                exit="exit"
                variants={MainVariant}
              >
                <Component {...pageProps} />
              </Main>
              <LoadingRouteChange />
              {pathname !== '/login' && !matches && <Footer />}
            </Parallax>
          </AuthProvider>
          <GlobalStyle />
        </ThemeProvider>
      </AnimatePresence>
    </StylesProvider>
  );
}

export default MyApp;
