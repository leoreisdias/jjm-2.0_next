import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { WhiteBackdrop } from '../WhiteBackdrop';

export const LoadingRouteChange = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && setLoading(true);
    const handleComplete = () => setLoading(false);
    const handleError = () => {
      setLoading(false);
      router.push('/404');
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router, router.asPath, router.events]);

  return loading && <WhiteBackdrop />;
};
