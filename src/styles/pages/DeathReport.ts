import { DialogContent } from '@material-ui/core';
import { complement, lighten, shade } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 90%;

  @media (min-width: 1900px) {
    width: 80%;
  }
  @media (max-width: 400px) {
    margin-top: 1rem;
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
    color: ${(props) => shade(0.25, props.theme.colors.text)};
  }

  @media (max-width: 720px) {
    grid-column: 1;
    grid-template-columns: 1fr;
  }

  @media (min-width: 1900px) {
    max-width: 80%;
  }
`;

export const ReportTitle = styled.h1`
  word-break: keep-all;
  margin: 1rem 0;
  font-family: 'Nunito';
  font-size: 1.4rem;

  color: ${(props) => props.theme.colors.title};
  transition: 0.5s;

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
  color: ${(props) => props.theme.colors.text};

  border-bottom: 1px solid
    ${(props) =>
      props.theme.title == 'dark'
        ? props.theme.colors.gray200
        : props.theme.colors.gray500};

  p:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  p:last-child {
    text-align: right;

    .icon {
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        scale: 1.1;
      }
    }
  }

  @media (max-width: 720px) {
    font-size: 0.875rem;
  }
`;

export const ReportContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: justify;
  padding-top: 1rem;

  p {
    line-height: 1.5rem;
    white-space: pre-wrap;
    color: ${(props) => shade(0.1, props.theme.colors.text)};
  }

  & p + div {
    align-self: flex-start;
    margin-top: 1rem;
    font-family: 'Nunito';

    width: 100%;

    padding-bottom: 2rem;
    border-bottom: 1px solid
      ${(props) =>
        props.theme.title == 'dark'
          ? props.theme.colors.gray200
          : props.theme.colors.gray500};

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
`;

export const ShareSocialMedia = styled.div`
  margin: 1rem 0;
  padding-bottom: 1rem;

  width: 100%;

  border-bottom: 1px solid
    ${(props) =>
      props.theme.title == 'dark'
        ? props.theme.colors.gray300
        : props.theme.colors.gray800};

  span {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    font-family: 'Nunito';

    background: ${(props) => props.theme.colors.gray100};

    width: 180px;
    padding: 0.5rem 1rem;

    border-radius: 20px;

    gap: 1rem;

    color: ${(props) => props.theme.colors.gray800};

    &:hover {
      background: ${(props) => complement(lighten(0.1, props.theme.colors.jjmPallete_1))};
      color: ${(props) =>
        props.theme.title == 'dark'
          ? props.theme.colors.gray900
          : props.theme.colors.gray100};
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

export const CustomDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  background: #f5fbff;
  font-family: 'Nunito';

  strong {
    font-size: 1.25rem;
    transition: 0.5s;
  }

  span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    transition: 0.5s;

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
