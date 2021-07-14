import { Card } from '@material-ui/core';
import styled from 'styled-components';

export const AdImage = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 200px;
  }
`;

export const CardAd = styled(Card)`
  max-width: 345px;
  margin: 30px auto;
  h3 {
    font-family: 'Nunito';
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  p {
    text-align: center;
    font-size: 1rem;
    font-family: 'Nunito';
  }
`;
