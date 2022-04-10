import { lighten, shade } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.section`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 2rem;
`;

export const Container = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 300px;
  gap: 3rem;
  color: black;
  word-break: break-all;

  margin: 0 auto;

  justify-items: center;

  margin-bottom: 2rem;
  transition: 0.5s;
  @media (max-width: 1180px) {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1024px) {
    gap: 0rem;
  }
`;

export const Main = styled.main`
  grid-column: 1 / span 2;

  column-count: 2;

  transition: 1s ease-in-out;

  @media (max-width: 720px) {
    grid-column: 1;
    grid-template-columns: 1fr;
    column-count: 1;
  }
`;

export const Aside = styled.aside`
  max-width: 100%;

  display: flex;
  flex-direction: column;

  transition: 1s ease-in-out;

  label {
    width: 90%;
    margin: 1rem auto;

    display: flex;
    flex-direction: row;
    align-items: center;

    background: ${(props) => lighten(0.75, props.theme.colors.background)};
    border-radius: 10px;

    padding: 0 0.5rem;
    box-shadow: 0 0 0 2pt ${(props) => lighten(0.05, props.theme.colors.jjmPallete_1)};

    &:hover {
      border: none;
      box-shadow: 0 0 0 2pt ${(props) => shade(0.05, props.theme.colors.jjmPallete_1)};
    }
    input {
      width: 100%;
      height: 38px;
      border: none;
      border-radius: 10px;
      padding-left: 1rem;
      margin-left: 0.25rem;

      font-family: 'Nunito';

      background: ${(props) => lighten(0.75, props.theme.colors.background)};

      color: ${(props) => props.theme.colors.gray800};

      &:focus {
        outline: none;
      }
    }
  }

  @media (max-width: 768px) {
    order: -1;
    max-width: 100vw;
  }
`;

export const CoffeePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h3 {
    color: ${(props) => props.theme.colors.title};
  }

  & > h4 {
    color: ${(props) => props.theme.colors.jjmPallete_1};
    margin-bottom: 0.25rem;
  }

  & > table {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.jjmPallete_1};
  }

  & > table :is(td, th) {
    border-spacing: 0;
    width: 100%;
    color: ${(props) => props.theme.colors.title};
    font-size: 0.875rem;
    word-break: keep-all;
  }

  & > table th {
    border-bottom: 1px solid ${(props) => props.theme.colors.jjmPallete_1};
  }

  & > table :is(td:first-child, td:nth-child(2)) {
    border-right: 1px solid ${(props) => props.theme.colors.jjmPallete_1};
  }

  & > table > thead {
    width: 100%;
  }

  & > table > thead tr {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 30%;
  }

  & > table > tbody tr {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 30%;
    justify-items: center;
    align-items: center;
    text-align: center;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
