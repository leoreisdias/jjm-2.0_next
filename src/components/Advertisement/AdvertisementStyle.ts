import { DialogContent } from '@material-ui/core';
import styled from 'styled-components';

export const AdvertisementContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
    list-style: none;

    padding-top: 1rem;
  }

  @media (max-width: 720px) {
    & ul {
      grid-template-columns: repeat(3, 1fr);
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
        width: 50%;
      }
    }
  }
`;

export const CustomDialogContent = styled(DialogContent)`
  background: #f5fbff;
`;
