import { useEffect, useState } from 'react';

import { useMediaQuery } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProps } from 'next/app';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Parallax } from 'react-parallax';
import { ThemeProvider } from 'styled-components';

import {
  FadeRightToLeft,
  BigFadeSlideDownToUp,
  SlowFadeInOut,
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
  const [scrollY, setScrollY] = useState(0);

  const minimumHeight = pathname == '/' ? 200 : 0;

  const matches = useMediaQuery('(max-width:720px)');

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            >
              <AnimatePresence exitBeforeEnter>
                <ParallaxPageOne
                  style={{ height: '100vh' }}
                  initial="enter"
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
                      rotate: [1, 10, -16.2, -20.2, -4, 1],
                      transition: { duration: 0.3 },
                    }}
                    initial="begin"
                    animate="animate"
                    variants={BigFadeSlideDownToUp}
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
              </AnimatePresence>
            </Parallax>
          )}

          <Parallax>
            {pathname !== '/login' && scrollY >= minimumHeight && (
              <AnimatePresence exitBeforeEnter>
                <motion.span
                  initial="begin"
                  animate="animate"
                  exit="exit"
                  variants={SlowFadeInOut}
                >
                  <Header toggleTheme={toggleTheme} />
                  <Topics />
                </motion.span>
              </AnimatePresence>
            )}
            <AnimatePresence exitBeforeEnter>
              <Main
                login={pathname === '/login'}
                initial="begin"
                animate="animate"
                exit="exit"
                variants={SlowFadeInOut}
              >
                <Component {...pageProps} />
              </Main>
            </AnimatePresence>

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
