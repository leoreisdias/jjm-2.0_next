import { motion } from 'framer-motion';
import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const LastPostsWrapper = styled.section`
  margin-bottom: 1rem;

  legend {
    font-weight: 700;
    color: ${(props) => props.theme.colors.gray900};
    font-size: 1.25rem;

    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
  @media (max-width: 320px) {
    margin-top: 2rem;
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

  &:hover {
    filter: grayscale(60%);
  }

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
  }

  p span {
    display: block;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
  }

  p strong {
    font-size: 0.875rem;

    transition: 0.25s;
    color: ${(props) => shade(0.5, props.theme.colors.jjmPallete_1)};

    &:hover {
      color: ${(props) => lighten(0.1, props.theme.colors.jjmPallete_1)};
    }
  }
`;
