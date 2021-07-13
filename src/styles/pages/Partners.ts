import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  max-width: 90%;

  ul {
    width: 100%;
    display: flex;
    justify-content: center;

    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }
`;

export const ListItem = styled.li`
  list-style: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 2rem;

  background: ${(props) => props.theme.colors.gray100};
  max-height: 200px;
  border-radius: 5px;

  strong {
    font-size: 1.1rem;
    text-align: center;
  }

  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;

    strong {
      font-size: 2rem;
    }
  }
`;

export const ListItemButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  justify-content: center;
  align-items: center;

  button {
    padding: 0.5rem 1rem;

    border: none;
    border-radius: 3px;
    color: ${(props) => props.theme.colors.white};

    transition: 0.2s;

    &:hover {
      filter: brightness(0.9);
      scale: 1.05;
    }
  }

  & button:first-child {
    background: ${(props) => props.theme.colors.jjmRed};
  }

  & button:last-child {
    background: ${(props) => props.theme.colors.jjmBlue};
  }

  .active {
    background: ${(props) => props.theme.colors.jjmGreen};
  }
`;
