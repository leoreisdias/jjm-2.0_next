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
  max-width: 260px;
  margin-bottom: 0.25rem;
  min-width: 260px;

  h2 {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 0.875rem;
  }

  @media (max-width: 400px) {
    display: none;
  }
`;
