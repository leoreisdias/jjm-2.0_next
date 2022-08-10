import IconButton from '@material-ui/core/IconButton';
import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const Card = styled.div`
  display: table;
  flex-direction: column;

  align-items: center;

  color: ${(props) => props.theme.colors.gray800};

  max-width: 24.785rem;
  margin-top: 10px;

  word-break: keep-all;

  background: ${(props) => lighten(0.75, props.theme.colors.background)};

  border-radius: 10px;

  -webkit-box-shadow: 0px 2px 45px -9px rgb(0 0 0 / 20%);
  -moz-box-shadow: 0px 2px 45px -9px rgb(0 0 0 / 20%);
  box-shadow: 0px 2px 45px -9px rgb(0 0 0 / 20%);

  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;

  transition: 1s;

  img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    filter: contrast(1.2) brightness(1);

    transition: 0.5s;

    &:hover {
      filter: contrast(1) brightness(0.8);
    }
  }

  small {
    padding: 0rem 0rem 0rem 1rem;
    font-size: 1rem;
    align-self: flex-start;

    text-transform: capitalize;
  }

  h3 {
    font-size: 1.375rem;
    padding: 0.2rem 0.8rem;
    margin-top: 1rem;
    text-align: center;

    transition: 0.5s;

    color: ${(props) => shade(0.5, props.theme.colors.jjmPallete_1)};

    &::first-letter {
      text-transform: capitalize;
    }

    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.colors.jjmPallete_1};
    }
  }

  h3 + p {
    padding: 1rem 2rem;
    text-align: center;
    color: ${(props) =>
      props.theme.title == 'dark'
        ? shade(1, props.theme.colors.text)
        : shade(0.8, props.theme.colors.text)};
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
