import { Card, DialogContent } from '@material-ui/core';
import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const AdImage = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 0.25rem;
  img {
    width: 200px;
  }
`;

export const CardAd = styled(Card)`
  max-width: 260px;
  margin-bottom: 0.25rem;
  min-width: 260px;
  background: ${(props) => lighten(0.75, props.theme.colors.background)};

  h2 {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 0.875rem;
  }
  text-align: center;
`;

export const CustomDialogContent = styled(DialogContent)`
  background: ${(props) => lighten(0.75, props.theme.colors.background)};
`;

export const DetailHighlightModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    text-align: center;
    color: ${(props) => props.theme.colors.gray800};
    font-size: 1.25rem;
  }

  p {
    font-size: 1.1rem;
    margin: 1rem 0;
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.jjmPallete_1};
    font-weight: 600;
  }

  img {
    border-radius: 5px;
  }

  strong {
    margin-top: 1rem;
    color: ${(props) => shade(0.1, props.theme.colors.jjmPallete_1)};
  }

  span {
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      scale: 1.05;
    }

    span {
      margin-top: 0.5rem;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      gap: 0.25rem;

      font-weight: 600;

      color: ${(props) => props.theme.colors.gray900};
    }
  }
  @media (max-width: 380px) {
    h2 {
      font-size: 1.2rem;
    }
  }
`;
