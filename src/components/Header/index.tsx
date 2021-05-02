import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useLayout } from '../../context/LayoutContext';
import { IoMenu } from 'react-icons/io5';

import { HeaderContainer } from './HeaderStyle';

export function Header() {
  const { handleNavActivation } = useLayout();

  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR,
  });

  return (
    <HeaderContainer>
      <img src="/logo.png" alt="GoCast" />
      <p>Na Pura Verdade é Isso</p>
      <span>{currentDate}</span>
      <IoMenu
        size={50}
        color={'white'}
        onClick={handleNavActivation}
        style={{ cursor: 'pointer' }}
      />
    </HeaderContainer>
  );
}
