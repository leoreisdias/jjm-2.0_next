import { DialogContent } from '@material-ui/core';
import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const AdvertisementContainer = styled.section<{
  reverse: boolean;
  isDarkMode: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.reverse ? 'column-reverse' : 'column')};

  & ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
    list-style: none;

    padding-top: 1rem;

    li {
      background: ${(props) =>
        props.isDarkMode ? props.theme.colors.gray100 : props.theme.colors.gray50};
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        scale: 1.05;
      }
    }
  }

  @media (max-width: 1020px) {
    span {
      flex-direction: column;
      gap: 0;
    }
    & ul {
      grid-template-columns: repeat(3, 1fr);

      li {
        margin: auto;
        width: 75%;
      }
    }
  }

  @media (max-width: 400px) {
    & ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      li {
        display: flex;
        justify-content: center;
        margin: auto;
        width: 75%;
      }
    }
  }
`;

export const CustomDialogContent = styled(DialogContent)`
  background: ${(props) => lighten(0.75, props.theme.colors.background)};
`;

export const ExpiredPartners = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  h4 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.jjmRed};
  }

  p {
    font-size: 1.2rem;
  }
  ul {
    margin: 1rem 0;
    line-height: 2rem;
    li {
      font-size: 1.1rem;
      color: ${(props) => shade(0.2, props.theme.colors.jjmGreen)};
    }
  }
`;
