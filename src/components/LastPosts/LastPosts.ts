import { motion } from 'framer-motion';
import { lighten } from 'polished';
import styled from 'styled-components';

export const LastPostsWrapper = styled.section`
  margin-bottom: 1rem;

  legend {
    font-weight: 700;
    color: ${(props) => props.theme.colors.title};
    font-size: 1.25rem;

    margin: 0.875rem 0 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 0rem 2rem;
  }
  @media (max-width: 320px) {
    margin-top: 1rem;
  }
`;

export const LastPostsContainer = styled(motion.li)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;

  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray200};

  list-style: none;

  cursor: pointer;

  img {
    border-radius: 50%;
    min-width: 48px;
    width: 48px;
    max-width: 48px;
    transition: 0.25s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  p {
    max-width: 75%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: lowercase;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  p span {
    display: block;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
    color: ${(props) => props.theme.colors.title};
  }

  p strong {
    font-size: 0.95rem;

    transition: 0.3s;
    color: ${(props) => props.theme.colors.jjmPallete_1};

    &:hover {
      color: ${(props) =>
        props.theme.title == 'dark'
          ? lighten(0.5, props.theme.colors.jjmPallete_1)
          : lighten(0.1, props.theme.colors.jjmPallete_1)};
    }
  }
`;
