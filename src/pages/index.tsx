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
        <aside>
          <legend>Ultimas Noticias</legend>
          <ul>
            <li>Noticia</li>
            <li>Noticia</li>
            <li>Noticia</li>
            <li>Noticia</li>
          </ul>
        </aside>
      </Container>
    </Wrapper>
  );
}
