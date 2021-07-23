import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { api } from '../services/api';
import { ListImages, PartnersContainer } from '../styles/pages/Ourpartners';
import { PartnersProps } from '../types/interfaces/Partners';

interface OurPartnersServerProps {
  partners: PartnersProps[];
}
const wppMsg = 'Olá! Vi vocês pelo JJM.';

const PartnerItemVariant = {
  initial: {
    scale: 0.8,
    y: 50,
    x: 10,
    opacity: 0,
  },
  enter: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    scale: 0.6,
    y: 100,
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function OurPartners({ partners }: OurPartnersServerProps) {
  return (
    <PartnersContainer>
      <Head>
        <title>Nossos Parceiros | JJM</title>
      </Head>
      <h1>Nossos Parceiros</h1>
      <ListImages
        initial="initial"
        animate="enter"
        exit="exit"
        variants={{
          enter: {
            transition: {
              staggerChildren: 0.5,
            },
          },
          exit: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {partners &&
          partners.map((item) => {
            return (
              <>
                <motion.li
                  key={item._id}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  variants={PartnerItemVariant}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, 2.1, 3.1, -3.1, -2.1, -1.1, 0],
                    transition: { duration: 0.3 },
                  }}
                >
                  <a
                    href={
                      item.facebook_url ??
                      `https://api.whatsapp.com/send?phone=55${item.whatsapp_url}&text=${wppMsg}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={item.imageURL}
                      width={200}
                      height={200}
                      objectFit="contain"
                    />
                  </a>
                </motion.li>
              </>
            );
          })}
      </ListImages>
    </PartnersContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await api.get('/partners');

    return {
      props: {
        partners: data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
