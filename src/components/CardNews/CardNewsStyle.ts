import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  color: ${(props) => props.theme.colors.background};

  max-width: 24.785rem;
  margin-bottom: 2rem;

  word-break: keep-all;

  background: ${(props) => props.theme.colors.white};

  -webkit-box-shadow: 0px 2px 45px -9px rgb(0 0 0 / 20%);
  -moz-box-shadow: 0px 2px 45px -9px rgb(0 0 0 / 20%);
  box-shadow: 0px 2px 45px -9px rgb(0 0 0 / 20%);

  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;

  img {
    width: 100%;
    height: 100%;
    filter: contrast(1.2) brightness(1);
  }

  small {
    padding: 0.675rem 1rem 2rem 1rem;
    font-size: 1rem;
    align-self: flex-start;
  }

  h3 {
    font-size: 1.475rem;
    padding: 0.2rem 2rem;
    text-align: center;

    text-transform: lowercase;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  h3 + p {
    padding: 1rem 2rem;
  }

  hr {
    margin-top: 1rem;
    align-self: flex-start;
    width: 50%;
  }

  hr + span {
    text-transform: uppercase;
    padding: 1rem 2rem;
    align-self: flex-start;
  }

  @media (max-width: 700px) {
    max-width: 20.785rem;
  }
`;
