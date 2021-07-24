import { useState } from 'react';

import { Dialog } from '@material-ui/core';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { SlowFadeInOut, slowFadeInOut_SlideDownToUp } from '../../assets/motion/Variants';
import { WeatherForecast } from '../WeatherForecast';
import { TopicsContainer, ButtonTopic, CustomDialogContent } from './TopicsStyle';

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
          variants={SlowFadeInOut}
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
              variants={slowFadeInOut_SlideDownToUp}
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
            variants={slowFadeInOut_SlideDownToUp}
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
              variants={slowFadeInOut_SlideDownToUp}
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
              variants={slowFadeInOut_SlideDownToUp}
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
            variants={slowFadeInOut_SlideDownToUp}
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
