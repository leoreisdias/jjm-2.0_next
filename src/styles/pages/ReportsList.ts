import { motion } from 'framer-motion';
import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  margin: 2rem 0;

  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  h1,
  h3 {
    text-align: center;
    color: ${(props) => props.theme.colors.title};
  }

  h3 {
    font-size: 1.5rem;
  }
`;

export const List = styled(motion.ul)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  list-style: none;
`;

export const ListItem = styled(motion.li)`
  position: relative;

  width: 100%;
  max-width: 800px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;
  padding: 0.5rem 2rem 0.5rem 1rem;

  height: 150px;

  background: ${(props) => shade(0.1, props.theme.colors.gray100)};

  color: ${(props) => props.theme.colors.gray900};

  .icon {
    cursor: pointer;

    &:hover {
      scale: 1.1;
    }
  }
  .davePeace {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 680px) {
    flex-direction: column;
    height: 100%;
    max-width: 280px;
    gap: 1rem;

    padding: 0.5rem 1rem 0.5rem 1rem;
  }
`;

export const Person = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  img {
    border-radius: 10px;
  }

  strong {
    font-size: 1.25rem;
    text-transform: capitalize;
    text-align: center;
  }

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 0;

    strong {
      font-size: 1.4rem;
    }
  }
`;

export const NoteInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  strong {
    font-size: 1.2rem;
  }

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
