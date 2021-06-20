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
  const [openCoffeeModal, setOpenCoffeeModal] = useState(false);

  function handleWeatherModal() {
    setOpenWeatherModal(!openWeatherModal);
  }

  function handleCoffeeModal() {
    setOpenCoffeeModal(!openCoffeeModal);
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
            active={pathname == '/notes'}
            initial="begin"
            animate="animate"
            exit="exit"
            variants={TopicsVariant}
            onClick={handleCoffeeModal}
          >
            Cotação do Café
          </ButtonTopic>
          <ButtonTopic
            active={false}
            initial="begin"
            animate="animate"
            exit="exit"
            variants={TopicsVariant}
            onClick={handleWeatherModal}
          >
            Previsão do Tempo
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
          <Dialog
            open={openCoffeeModal}
            onClose={handleCoffeeModal}
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
