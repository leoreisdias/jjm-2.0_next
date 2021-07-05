import { useState, useContext } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import Switch from '@material-ui/core/Switch';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { GiExitDoor } from 'react-icons/gi';
import { GrDocumentConfig } from 'react-icons/gr';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../hooks/useAuth';
import { HeaderContainer, SpanExit } from './HeaderStyle';

interface HeaderProps {
  toggleTheme: () => void;
}

export function Header({ toggleTheme }: HeaderProps) {
  const { push } = useRouter();

  const { colors } = useContext(ThemeContext);

  const { isAuthenticated, handleLogout } = useAuth();

  const [switchState, setSwitchState] = useState(true);
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR,
  });

  function handleThemeSwitch() {
    setSwitchState(!switchState);
    toggleTheme();
  }

  function goToManagement() {
    push('/writer-area?update=partners&id=60e211f1f83cf700210567e4');
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
        {isAuthenticated && (
          <>
            <SpanExit>
              <motion.span whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}>
                <GrDocumentConfig
                  size={25}
                  color={colors.gray900}
                  onClick={goToManagement}
                />
              </motion.span>
              <motion.span whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}>
                <GiExitDoor size={25} color={colors.gray900} onClick={handleLogout} />
              </motion.span>
            </SpanExit>
          </>
        )}
      </div>
    </HeaderContainer>
  );
}
