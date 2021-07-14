import { DialogContent } from '@material-ui/core';
import styled from 'styled-components';

export const CustomDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  background: #f5fbff;
  font-family: 'Nunito';

  strong {
    font-size: 1.25rem;
  }

  span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;

      color: ${(props) => props.theme.colors.white};
      font-family: 'Nunito';

      transition: 0.2s;

      &:hover {
        filter: brightness(0.9);
        scale: 1.1;
      }
    }

    & button:first-child {
      background: ${(props) => props.theme.colors.jjmRed};
    }
    & button:last-child {
      background: ${(props) => props.theme.colors.gray900};
    }
  }

  @media (max-width: 400px) {
    strong {
      font-size: 1rem;
    }
    span {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;
