import { useState, useContext } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import Switch from '@material-ui/core/Switch';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaHandshake } from 'react-icons/fa';
import { GiExitDoor } from 'react-icons/gi';
import { RiAdminFill } from 'react-icons/ri';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../hooks/useAuth';
import { HeaderContainer, SpanExit } from './HeaderStyle';
interface HeaderProps {
  toggleTheme: () => void;
}

const wppMsg = 'Olá! Estou interessado em ser um Patrocinador do JJM';

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

  return (
    <HeaderContainer>
      {/* <div>
        <Image src="/logo.png" alt="GoCast" width={80} height={80} objectFit="contain" />
      </div> */}

      <div>
        <div>
          <span className="date">{currentDate}</span>
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
        <a
          href={`https://api.whatsapp.com/send?phone=5535997283216&text=${wppMsg}`}
          target="_blank"
          rel="noreferrer"
        >
          Seja um Patrocinador
        </a>
        {isAuthenticated && (
          <>
            <SpanExit>
              <motion.span whileHover={{ scale: 1.3, transition: { duration: 0.1 } }}>
                <FaHandshake
                  size={25}
                  color={colors.jjmBlue}
                  onClick={() => push('/partners')}
                />
              </motion.span>
              <motion.span whileHover={{ scale: 1.3, transition: { duration: 0.1 } }}>
                <RiAdminFill
                  size={25}
                  color={colors.jjmGreen}
                  onClick={() => push('/writer-area')}
                />
              </motion.span>
              <motion.span whileHover={{ scale: 1.3, transition: { duration: 0.1 } }}>
                <GiExitDoor size={25} color={colors.jjmRed} onClick={handleLogout} />
              </motion.span>
            </SpanExit>
          </>
        )}
      </div>
    </HeaderContainer>
  );
}
