import React, { useState } from 'react';

import { useMediaQuery } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Parallax } from 'react-parallax';
import { ThemeProvider } from 'styled-components';

import {
  FadeRightToLeft,
  BigFadeSlideDownToUp,
  SlowFadeInOut,
} from '../assets/motion/Variants';
import { LoadingRouteChange } from '../components/LoadingRouteChange';
import { AuthProvider } from '../context/AuthContext';
import GlobalStyle from '../styles/global';
import { Main, ParallaxPageOne } from '../styles/pages/App';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

const Header = dynamic(() => import('../components/Header'));
const Footer = dynamic(() => import('../components/Footer'));
const Topics = dynamic(() => import('../components/Topics'));

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [theme, setTheme] = useState(light);

  const matches = useMediaQuery('(max-width:720px)');

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <StylesProvider injectFirst>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta name="description" content="JJM - Notícias" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="nightmode" content="enable/disable" />
        <meta name="screen-orientation" content="portrait" />
        <meta name="theme-color" content="#1D75A5" />
        <link rel="manifest" href="/manifest.json" />
        <link href="/favicon.ico" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon.ico" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          {pathname == '/' && (
            <Parallax
              blur={{ min: -15, max: 15 }}
              bgImage={'/bgJJM.webp'}
              bgImageAlt="JJM"
              strength={100}
              bgImageStyle={{ opacity: 0.9 }}
            >
              <ParallaxPageOne style={{ height: '100vh' }}>
                <motion.span
                  whileHover={{
                    rotate: [1, 10, 20, 60, 80, 100, 0],
                    transition: { duration: 0.4 },
                  }}
                  initial="begin"
                  animate="animate"
                  variants={BigFadeSlideDownToUp}
                >
                  <Image
                    src={'/pwa_icon.webp'}
                    width={150}
                    height={150}
                    objectFit="contain"
                    alt="Logo JJM"
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
              <motion.span
                initial="begin"
                animate="animate"
                exit="exit"
                variants={SlowFadeInOut}
              >
                <Header toggleTheme={toggleTheme} />
                <Topics />
              </motion.span>
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
