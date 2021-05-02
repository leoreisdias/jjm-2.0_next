import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { TopicsContainer, ButtonTopic } from './TopicsStyle';
import { useLayout } from '../../context/LayoutContext';

export function Topics() {
  const { isNavActive } = useLayout();
  const { pathname } = useRouter();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <TopicsContainer className={isNavActive ? 'active' : ''}>
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
