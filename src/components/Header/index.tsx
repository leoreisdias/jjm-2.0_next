import { useState } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import Switch from '@material-ui/core/Switch';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { HeaderContainer } from './HeaderStyle';

interface HeaderProps {
  toggleTheme: () => void;
}

export function Header({ toggleTheme }: HeaderProps) {
  const [switchState, setSwitchState] = useState(true);
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR,
  });

  function handleThemeSwitch() {
    setSwitchState(!switchState);
    toggleTheme();
  }

  return (
    <HeaderContainer>
      <img src="/logo.png" alt="GoCast" />
      <p>Na Pura Verdade é Isso</p>
      <div>
        <span>{currentDate}</span>
        <NoSsr>
          <Switch
            checked={switchState}
            onChange={handleThemeSwitch}
            name="checkedA"
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </NoSsr>
      </div>
    </HeaderContainer>
  );
}
