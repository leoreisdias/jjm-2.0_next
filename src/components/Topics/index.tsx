import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { SlowFadeInOut } from '../../assets/motion/Variants';
import { WeatherForecast } from '../WeatherForecast';
import { TopicsContainer, ButtonTopic, CustomDialogContent } from './TopicsStyle';

const Dialog = dynamic(() => import('@material-ui/core/Dialog'));

export default function Topics() {
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
            >
              Notícias
            </ButtonTopic>
          </Link>

          <ButtonTopic
            whileHover={{ scale: 1.05, rotate: 1.1, transition: { duration: 0.05 } }}
            active={false}
            onClick={handleWeatherModal}
          >
            Previsão do Tempo
          </ButtonTopic>
          <Link href="/reports">
            <ButtonTopic
              whileHover={{ scale: 1.05, rotate: 1.1, transition: { duration: 0.05 } }}
              active={pathname == '/reports'}
            >
              Notas de Falecimento
            </ButtonTopic>
          </Link>

          <Link href="/ourpartners">
            <ButtonTopic
              whileHover={{ scale: 1.05, rotate: 1.1, transition: { duration: 0.05 } }}
              active={pathname == '/ourpartners'}
            >
              Nossos Parceiros
            </ButtonTopic>
          </Link>

          <ButtonTopic
            whileHover={{ scale: 1.05, rotate: 1.1, transition: { duration: 0.05 } }}
            active={false}
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
