import { motion } from 'framer-motion';
import { rgba } from 'polished';
import styled from 'styled-components';

export const Main = styled(motion.main)<{ login: boolean }>`
  margin: ${(props) => (!props.login ? '2rem' : '0')} auto 0 auto;
  display: flex;
  padding-top: ${(props) => (!props.login ? '17rem' : '0')};
  justify-content: center;
  min-height: 100vh;

  transition: 1s;

  .MuiPaginationItem-root {
    color: ${(props) =>
      props.theme.title == 'dark' ? props.theme.colors.white : '#000'};
    border-color: ${(props) => props.theme.colors.jjmPallete_1};
  }

  @media (max-width: 780px) {
    padding-top: ${(props) => (!props.login ? '20rem' : '0')};
  }
  @media (max-width: 420px) {
    padding-top: ${(props) => (!props.login ? '24rem' : '0')};
  }
  @media (max-width: 300px) {
    padding-top: ${(props) => (!props.login ? '28rem' : '0')};
  }
`;

export const ParallaxPageOne = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0 2000px ${(props) => rgba(props.theme.colors.jjmPallete_1, 0.4)};
  strong {
    color: ${(props) => props.theme.colors.white};
    font-size: 1.8rem;
    border-left: 1px solid white;
    margin-left: 1rem;
    padding-left: 1rem;
  }

  @media (max-width: 700px) {
    flex-direction: column;

    strong {
      border-left: none;
      margin-left: 0;
      padding-left: 0;
    }
  }

  @media (max-width: 480px) {
    strong {
      font-size: 1.4rem;
    }
  }
`;
