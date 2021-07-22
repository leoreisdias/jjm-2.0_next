import { useState } from 'react';

import { Dialog } from '@material-ui/core';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { WeatherForecast } from '../WeatherForecast';
import { TopicsContainer, ButtonTopic, CustomDialogContent } from './TopicsStyle';

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
  const [openWeatherModal, setOpenWeatherModal] = useState(false);

  function handleWeatherModal() {
    setOpenWeatherModal(!openWeatherModal);
  }

  function handleFacebookPage() {
    window.open('https://www.facebook.com/jornaljotamaria', '_blank');
  }

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
              whileHover={{
                scale: 1.1,
                rotate: pathname == '/' ? 2 : 1.2,
                transition: { duration: 0.05 },
              }}
              active={pathname == '/'}
              initial="begin"
              animate="animate"
              exit="exit"
              variants={TopicsVariant}
            >
              Notícias
            </ButtonTopic>
          </Link>

          <ButtonTopic
            whileHover={{ scale: 1.05, rotate: 1.1, transition: { duration: 0.05 } }}
            active={false}
            initial="begin"
            animate="animate"
            exit="exit"
            variants={TopicsVariant}
            onClick={handleWeatherModal}
          >
            Previsão do Tempo
          </ButtonTopic>
          <Link href="/reports">
            <ButtonTopic
              whileHover={{ scale: 1.05, rotate: 1.1, transition: { duration: 0.05 } }}
              active={pathname == '/reports'}
              initial="begin"
              animate="animate"
              exit="exit"
              variants={TopicsVariant}
            >
              Notas de Falecimento
            </ButtonTopic>
          </Link>

          <Link href="/ourpartners">
            <ButtonTopic
              whileHover={{ scale: 1.05, rotate: 1.1, transition: { duration: 0.05 } }}
              active={pathname == '/ourpartners'}
              initial="begin"
              animate="animate"
              exit="exit"
              variants={TopicsVariant}
            >
              Nossos Parceiros
            </ButtonTopic>
          </Link>

          <ButtonTopic
            whileHover={{ scale: 1.05, rotate: 1.1, transition: { duration: 0.05 } }}
            active={false}
            initial="begin"
            animate="animate"
            exit="exit"
            variants={TopicsVariant}
            onClick={handleFacebookPage}
          >
            Visite nossa Página
          </ButtonTopic>
          <Dialog
            open={openWeatherModal}
            onClose={handleWeatherModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <CustomDialogContent>
              <WeatherForecast />
            </CustomDialogContent>
          </Dialog>
        </TopicsContainer>
      </AnimatePresence>
    </>
  );
}
