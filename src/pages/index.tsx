import { Aside } from '../components/Aside';
import { CardNews } from '../components/CardNews';
import { Wrapper, Container, Main } from '../styles/pages/Home';

export default function Home() {
  return (
    <Wrapper>
      <Container>
        <Main>
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
        </Main>
        <Aside />
      </Container>
    </Wrapper>
  );
}
