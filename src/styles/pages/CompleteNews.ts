import { DialogContent } from '@material-ui/core';
import { shade } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 90%;

  margin-bottom: 1rem;

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

  display: flex;
  flex-direction: column;

  img {
    justify-self: flex-start;
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

  color: ${(props) => props.theme.colors.title};

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

  transition: 0.5s;

  p:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  p:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    text-align: right;

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      .icon {
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          scale: 1.1;
        }
      }
    }
  }

  @media (max-width: 720px) {
    font-size: 0.875rem;
  }

  @media (max-width: 400px) {
    p:last-child {
      max-width: 70%;
    }
  }
`;

export const NewsContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 1rem;
  color: ${(props) =>
    props.theme.title == 'dark'
      ? shade(0.1, props.theme.colors.text)
      : shade(0.5, props.theme.colors.text)};

  p {
    line-height: 1.75rem;
    white-space: pre-wrap;
    text-align: justify;
  }

  img {
    max-width: 200px;
    display: inline-block;
  }

  ul {
    padding-left: 1rem;
  }
`;

export const OtherImages = styled.section`
  margin-top: 2rem;
  width: 100%;

  .image-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  img {
    display: inline-block;
  }

  h5 {
    font-family: 'Nunito';
    font-size: 1.1rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.gray800};
  }
`;

export const Video = styled.div`
  align-self: flex-start;
  margin-top: 2rem;

  h5 {
    font-family: 'Nunito';
    font-size: 1.1rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.gray800};
  }

  hr {
    display: block;
    padding: 0.8px 0;
    width: 100%;
    margin: 0.3rem;
    border-radius: 100%;
    border: none;

    background: ${(props) => props.theme.colors.jjmPallete_1};
  }

  iframe {
    max-width: 100%;
    transition: 0.5s;
  }

  div {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 500px) {
    iframe {
      height: 220px;
    }
  }
`;

export const OfferedBy = styled.div`
  align-self: flex-start;
  margin-top: 2rem;

  h5 {
    font-family: 'Nunito';
    font-size: 1.1rem;
    font-weight: 600;
    color: ${(props) =>
      props.theme.title == 'dark'
        ? shade(0.1, props.theme.colors.text)
        : shade(0.5, props.theme.colors.text)};
  }

  span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    transition: 0.5s;

    p {
      font-family: 'Nunito';
      font-weight: 600;

      color: ${(props) => props.theme.colors.jjmPallete_1};
    }
  }

  @media (max-width: 380px) {
    span {
      flex-direction: column;
      gap: 0;
    }
  }
`;

export const Subjects = styled.div`
  align-self: flex-start;
  margin-top: 1rem;
  font-family: 'Nunito';

  width: 100%;

  padding-bottom: 2rem;
  border-bottom: 1px solid
    ${(props) =>
      props.theme.title == 'dark'
        ? props.theme.colors.gray300
        : props.theme.colors.gray800};

  color: ${(props) => props.theme.colors.title};

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;

    li {
      width: 100%;
      max-width: 100px;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme.colors.gray800};
      font-size: 0.75rem;
      text-align: center;

      padding: 0.5rem;
      border-radius: 2.5px;

      list-style: none;
      background: ${(props) => props.theme.colors.gray100};
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

    color: ${(props) => props.theme.colors.gray900};
  }
`;

export const RelatedNewsSection = styled.section`
  font-family: 'Nunito';
  color: ${(props) => props.theme.colors.title};

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    margin-top: 1rem;

    gap: 0.5rem;
    transition: 0.5s;

    li {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      list-style: none;

      max-width: 250px;
      height: 250px;

      cursor: pointer;

      &:hover {
        filter: brightness(0.9);
      }

      strong {
        display: block;
        font-size: 0.925rem;
        margin-top: 0.5rem;

        color: ${(props) => shade(0.2, props.theme.colors.title)};

        text-align: left;
        text-transform: capitalize;
        width: 100%;
        padding-bottom: 0.875rem;
      }

      span {
        font-size: 0.75rem;
        color: ${(props) => shade(0.1, props.theme.colors.text)};
        margin-top: auto;
        text-transform: uppercase;
        width: 100%;

        border-top: 1px solid
          ${(props) =>
            props.theme.title == 'dark'
              ? props.theme.colors.gray300
              : props.theme.colors.gray800};
      }
    }
  }

  @media (max-width: 1100px) {
    ul {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 720px) {
    ul {
      grid-template-columns: 1fr;

      li {
        span {
          margin-bottom: 0.875rem;
        }
      }
    }
  }
`;

export const LoadingRelatedNews = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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
