import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { TopicsContainer, ButtonTopic } from './TopicsStyle';

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

const TopicsContainerVariant = {
  begin: {
    scale: 0.96,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
  exit: {
    scale: 0.6,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};

export function Topics() {
  const { pathname } = useRouter();

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <TopicsContainer
          initial="begin"
          animate="animate"
          exit="exit"
          variants={TopicsContainerVariant}
        >
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
      </AnimatePresence>
    </>
  );
}
