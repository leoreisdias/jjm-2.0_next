import IconButton from '@material-ui/core/IconButton';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;

  align-items: center;

  color: ${(props) => props.theme.colors.background};

  max-width: 24.785rem;
  margin-bottom: 2rem;

  word-break: keep-all;

  background: ${(props) => props.theme.colors.white};

  -webkit-box-shadow: 0px 2px 45px -9px rgb(0 0 0 / 20%);
  -moz-box-shadow: 0px 2px 45px -9px rgb(0 0 0 / 20%);
  box-shadow: 0px 2px 45px -9px rgb(0 0 0 / 20%);

  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;

  transition: 1s;

  img {
    width: 100%;
    height: 100%;
    filter: contrast(1.2) brightness(1);
  }

  small {
    padding: 0rem 0rem 0rem 1rem;
    font-size: 1rem;
    align-self: flex-start;
  }

  h3 {
    font-size: 1.375rem;
    padding: 0.2rem 2rem;
    margin-top: 1rem;
    text-align: center;

    text-transform: lowercase;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  h3 + p {
    padding: 1rem 2rem;
  }

  hr {
    margin-top: 1rem;
    align-self: flex-start;
    width: 50%;
  }

  hr + span {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    padding: 0 0 0 1rem;
    align-self: flex-start;
  }

  &:hover {
  }

  @media (max-width: 700px) {
    max-width: 20.785rem;
  }
`;

export const IconButtonExpand = styled(IconButton)`
  max-width: 345px;

  transform: rotate(0deg);
  margin-left: auto;
  transition: 0.5s;
`;
