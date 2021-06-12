import styled from 'styled-components';

export const Wrapper = styled.section`
  color: ${(props) => props.theme.colors.text};
`;

export const Container = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 300px;
  gap: 3rem;
  color: black;
  word-break: break-all;

  justify-items: center;

  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Main = styled.section`
  grid-column: 1 / span 2;

  transition: 1s ease-in-out;

  padding: 0 2rem;

  @media (max-width: 720px) {
    grid-column: 1;
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

export const Aside = styled.aside`
  max-width: 100%;

  display: flex;
  flex-direction: column;
  margin-right: 2rem;

  transition: 1s ease-in-out;

  @media (max-width: 768px) {
    order: -1;
    max-width: 100vw;
    margin-right: 0;
  }
`;
