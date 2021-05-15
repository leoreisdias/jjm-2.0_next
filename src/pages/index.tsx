import Head from 'next/head';
import Image from 'next/image';

import { LastPosts } from '../components/LastPosts';
import { CardNews } from '../components/CardNews';

import { Wrapper, Container, Main, Aside } from '../styles/pages/Home';

export default function Home() {
  return (
    <Wrapper>
      <Head>
        <title>Jornal JM</title>
      </Head>
      <Container>
        <Main>
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
        </Main>
        <Aside>
          <legend>Últimas postagens</legend>
          <ul>
            <LastPosts />
            <LastPosts />
            <LastPosts />
          </ul>
          <section>
            <img src="./ad.png" alt="Advertise" />
            <Image
              width={150}
              height={150}
              objectFit="contain"
              src="https://jjm-upload.s3.amazonaws.com/Parceiros/VilaBurger_logo.jpg"
              alt="Advertise"
            />
            <Image
              width={150}
              height={150}
              objectFit="contain"
              src="https://jjm-upload.s3.amazonaws.com/Parceiros/donizete_pintor.png"
              alt="Advertise"
            />
            <Image
              width={150}
              height={150}
              objectFit="contain"
              src="https://jjm-upload.s3.amazonaws.com/Parceiros/CentralCaf%C3%A9_white.jpeg"
              alt="Advertise"
            />
          </section>
        </Aside>
      </Container>
    </Wrapper>
  );
}
