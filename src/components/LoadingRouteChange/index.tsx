import { useEffect, useState, useContext } from 'react';

import { useRouter } from 'next/router';
import BeatLoader from 'react-spinners/BeatLoader';
import { ThemeContext } from 'styled-components';

import { CustomBackdrop } from './LoadingRouteChangeStyle';

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
      <CustomBackdrop open={loading}>
        <BeatLoader color={colors.white} size={30} />
      </CustomBackdrop>
    )
  );
};
