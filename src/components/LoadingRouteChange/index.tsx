import { useEffect, useState, useContext } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import BeatLoader from 'react-spinners/BeatLoader';
import { ThemeContext } from 'styled-components';

import { CustomBackdrop } from './LoadingRouteChangeStyle';

const PageLoadingVariant = {
  begin: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

export const LoadingRouteChange = () => {
  const router = useRouter();
  const { colors } = useContext(ThemeContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath, router.events]);

  return (
    loading && (
      <AnimatePresence exitBeforeEnter>
        <CustomBackdrop
          variants={PageLoadingVariant}
          initial="begin"
          animate="animate"
          exit="exit"
        >
          <BeatLoader color={colors.jjmPallete_1} size={30} />
        </CustomBackdrop>
      </AnimatePresence>
    )
  );
};
