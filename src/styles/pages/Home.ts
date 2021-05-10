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

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const Main = styled.main`
  grid-column: 1 / span 2;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.8rem;

  @media (max-width: 720px) {
    grid-column: 1;
    grid-template-columns: 1fr;
  }
`;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;

  legend {
    font-family: 'Montserrat';
    font-weight: 700;
    color: ${(props) => props.theme.colors.gray900};
    font-size: 1.25rem;

    padding: 0rem 0rem;

    margin-bottom: 1rem;
  }
`;
