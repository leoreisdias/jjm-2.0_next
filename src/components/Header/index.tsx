import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { HeaderContainer } from './HeaderStyle';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR,
  });

  return (
    <HeaderContainer>
      <img src="/logo.png" alt="GoCast" />
      <p>Na Pura Verdade é Isso</p>
      <span>{currentDate}</span>
    </HeaderContainer>
  );
}
