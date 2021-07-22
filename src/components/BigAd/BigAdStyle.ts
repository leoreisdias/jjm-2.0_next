import { Card, DialogContent } from '@material-ui/core';
import { shade } from 'polished';
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

  h2 {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 0.875rem;
  }
  text-align: center;
`;

export const CustomDialogContent = styled(DialogContent)`
  background: #f5fbff;
`;

export const DetailHighlightModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    margin: 1rem 0;
  }

  img {
    border-radius: 5px;
  }

  strong {
    margin-top: 1rem;
    color: ${(props) => shade(0.1, props.theme.colors.jjmPallete_1)};
  }

  @media (max-width: 380px) {
    h2 {
      font-size: 1.2rem;
    }
  }
`;
