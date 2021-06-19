import styled from 'styled-components';

export const Wrapper = styled.section`
  color: ${(props) => props.theme.colors.text};
  width: 90%;

  @media (min-width: 1900px) {
    width: 80%;
  }
`;

export const Container = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 300px;
  gap: 3rem;
  color: black;

  justify-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1700px) {
    grid-template-columns: 1fr 1fr 400px;
    gap: 1rem;
  }
`;

export const Main = styled.section`
  grid-column: 1 / span 2;

  max-width: 900px;

  transition: 1s ease-in-out;

  span {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h4 {
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
  }

  @media (max-width: 720px) {
    grid-column: 1;
    grid-template-columns: 1fr;
  }

  @media (min-width: 1900px) {
    max-width: 80%;
  }
`;

export const NewsTitle = styled.h1`
  word-break: keep-all;
  margin: 1rem 0;
  font-family: 'Nunito';
  font-size: 1.6rem;

  color: ${(props) => props.theme.colors.gray900};

  @media (max-width: 720px) {
    font-size: 1.25rem;
    text-align: center;
  }
`;

export const SmallDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  text-transform: capitalize;
  font-family: 'Nunito';

  padding-bottom: 1rem;
  color: ${(props) => props.theme.colors.gray500};

  border-bottom: 1px solid ${(props) => props.theme.colors.gray500};

  p:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  p:last-child {
    text-align: right;
  }

  @media (max-width: 720px) {
    font-size: 0.875rem;
  }
`;

export const NewsContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: justify;
  padding-top: 1rem;

  p {
    line-height: 1.5rem;
    white-space: pre-wrap;
    color: ${(props) => props.theme.colors.gray900};
  }

  & p + div {
    align-self: flex-start;
    margin-top: 1rem;
    font-family: 'Nunito';

    width: 100%;

    padding-bottom: 2rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray800};

    ul {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;

      li {
        width: 100%;
        max-width: 100px;

        display: flex;
        justify-content: center;

        color: ${(props) => props.theme.colors.gray500};
        font-size: 0.75rem;

        padding: 0.5rem;
        border-radius: 2.5px;

        list-style: none;
        background: ${(props) => props.theme.colors.gray100};
      }
    }
  }

  & div:last-child {
    margin: 1rem 0;
    padding-bottom: 1rem;

    width: 100%;

    border-bottom: 1px solid ${(props) => props.theme.colors.gray800};

    span {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      background: ${(props) => props.theme.colors.gray100};

      width: 180px;
      padding: 0.5rem 1rem;

      border-radius: 30px;

      gap: 1rem;

      color: ${(props) => props.theme.colors.gray800};
    }
  }
`;

export const Aside = styled.aside`
  max-width: 100%;

  display: flex;
  flex-direction: column;

  transition: 1s ease-in-out;

  @media (max-width: 768px) {
    max-width: 100vw;
  }
`;
