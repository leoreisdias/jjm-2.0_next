import styled, { css } from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  max-width: 90%;

  & h3:first-child {
    color: ${(props) => props.theme.colors.title};
  }

  ul {
    width: 100%;
    display: flex;
    justify-content: center;

    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }

  @media (max-width: 400px) {
    margin-top: 2rem;
  }
`;

export const ListItem = styled.li<{ active: boolean }>`
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

  hr {
    display: block;
    padding: 1.2px 0;
    width: 75%;
    margin: 0 auto;
    border-radius: 100%;
    border: none;

    background: ${(props) =>
      props.active ? props.theme.colors.jjmGreen : props.theme.colors.jjmRed};
    color: ${(props) =>
      props.active ? props.theme.colors.jjmGreen : props.theme.colors.jjmRed};
  }

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

  ${(props) =>
    !props.active &&
    css`
      filter: brightness(0.96);
    `}
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

  & button.disable {
    background: ${(props) => props.theme.colors.jjmRed};
  }

  & button.active {
    background: ${(props) => props.theme.colors.jjmGreen};
  }

  & button:last-child {
    background: ${(props) => props.theme.colors.jjmPallete_1};
  }
`;
