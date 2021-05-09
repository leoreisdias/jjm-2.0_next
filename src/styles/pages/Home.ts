import styled from 'styled-components';

export const Wrapper = styled.section`
  color: ${(props) => props.theme.colors.text};
`;

export const Container = styled.article`
  display: grid;
  border: 1px solid black;
  grid-template-columns: 1fr 1fr 1fr;
  color: black;
  word-break: break-all;

  justify-items: center;
  grid-auto-flow: column;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const Main = styled.main`
  grid-column: 1 / span 2;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;
