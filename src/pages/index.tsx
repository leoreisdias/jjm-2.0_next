import { LastPosts } from '../components/LastPosts';
import { CardNews } from '../components/CardNews';
import { Wrapper, Container, Main, Aside } from '../styles/pages/Home';
import Head from 'next/head';

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
        </Aside>
      </Container>
    </Wrapper>
  );
}
