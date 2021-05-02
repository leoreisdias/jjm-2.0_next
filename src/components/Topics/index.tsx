import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { TopicsContainer, ButtonTopic } from './TopicsStyle';

export function Topics() {
  const { pathname } = useRouter();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <TopicsContainer>
      <Link href="/">
        <ButtonTopic active={pathname == '/'}>Todos</ButtonTopic>
      </Link>
      <Link href="/daily-news">
        <ButtonTopic active={pathname == '/daily-news'}>
          Dia-Dia
        </ButtonTopic>
      </Link>
      <ButtonTopic active={pathname == '/pop-news'}>Mundo Pop</ButtonTopic>
      <ButtonTopic active={pathname == '/notes'}>
        Notas de Falecimento
      </ButtonTopic>
    </TopicsContainer>
  );
}
