import { useState } from 'react';

import Modal from '@material-ui/core/Modal';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { WeatherForecast } from '../WeatherForecast';
import { TopicsContainer, ButtonTopic, ModalContent } from './TopicsStyle';

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
  const [open, setOpen] = useState(false);

  function handleModal() {
    setOpen(!open);
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
              Todos
            </ButtonTopic>
          </Link>
          <ButtonTopic
            active={pathname == '/notes'}
            initial="begin"
            animate="animate"
            exit="exit"
            variants={TopicsVariant}
          >
            Notas de Falecimento
          </ButtonTopic>
          <ButtonTopic
            active={false}
            initial="begin"
            animate="animate"
            exit="exit"
            variants={TopicsVariant}
            onClick={handleModal}
          >
            Previsão do Tempo
          </ButtonTopic>
          <Modal
            open={open}
            onClose={handleModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <ModalContent>
              <WeatherForecast />
            </ModalContent>
          </Modal>
        </TopicsContainer>
      </AnimatePresence>
    </>
  );
}
