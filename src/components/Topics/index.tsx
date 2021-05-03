import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { TopicsContainer, ButtonTopic } from './TopicsStyle';
import { useLayout } from '../../context/LayoutContext';
import { AnimatePresence } from 'framer-motion';

const TopicsVariant = {
  begin: {
    scale: 0.96,
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
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};

export function Topics() {
  const { isNavActive } = useLayout();
  const { pathname } = useRouter();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {isNavActive ? (
          <TopicsContainer navActive={isNavActive}>
            <Link href="/">
              <ButtonTopic
                active={pathname == '/'}
                initial="begin"
                animate="animate"
                exit="exit"
                variants={TopicsVariant}
              >
                Todos
              </ButtonTopic>
            </Link>
            <Link href="/daily-news">
              <ButtonTopic
                active={pathname == '/daily-news'}
                initial="begin"
                animate="animate"
                exit="exit"
                variants={TopicsVariant}
              >
                Dia-Dia
              </ButtonTopic>
            </Link>
            <ButtonTopic
              active={pathname == '/pop-news'}
              initial="begin"
              animate="animate"
              exit="exit"
              variants={TopicsVariant}
            >
              Mundo Pop
            </ButtonTopic>
            <ButtonTopic
              active={pathname == '/notes'}
              initial="begin"
              animate="animate"
              exit="exit"
              variants={TopicsVariant}
            >
              Notas de Falecimento
            </ButtonTopic>
          </TopicsContainer>
        ) : (
          ''
        )}
      </AnimatePresence>
    </>
  );
}
