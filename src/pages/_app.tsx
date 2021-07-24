import { useState } from 'react';

import { useMediaQuery } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProps } from 'next/app';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Parallax } from 'react-parallax';
import { ThemeProvider } from 'styled-components';

import {
  EaseFadeSlideDownToUp,
  FadeRightToLeft,
  FadeSlideDownToUpSlow,
} from '../assets/motion/Variants';
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
              >
                <ParallaxPageOne
                  style={{ height: '100vh' }}
                  initial="enter"
                  animate="animate"
                  exit="exit"
                  variants={{
                    enter: {
                      transition: {
                        staggerChildren: 1,
                      },
                    },
                    exit: {
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                >
                  <motion.span
                    whileHover={{
                      scale: 1.1,
                      rotate: [1, 2, 5, -6.2, -4, 0],
                      transition: { duration: 0.4 },
                    }}
                    initial="begin"
                    animate="animate"
                    variants={FadeSlideDownToUpSlow}
                  >
                    <Image
                      src={'/logo.png'}
                      width={150}
                      height={150}
                      objectFit="contain"
                    />
                  </motion.span>
                  <motion.strong
                    initial="begin"
                    animate="animate"
                    variants={FadeRightToLeft}
                  >
                    Na Pura Verdade Junto de Você!
                  </motion.strong>
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
                variants={EaseFadeSlideDownToUp}
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
