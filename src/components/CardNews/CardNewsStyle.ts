import styled from 'styled-components';

export const Card = styled.div`
  display: table;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  font-family: Montserrat;
  color: ${(props) => props.theme.colors.background};

  max-width: 24.785rem;

  background: ${(props) => props.theme.colors.white};

  -webkit-box-shadow: 0px 15px 45px -9px rgb(0 0 0 / 20%);
  -moz-box-shadow: 0px 15px 45px -9px rgb(0 0 0 / 20%);
  box-shadow: 0px 15px 45px -9px rgb(0 0 0 / 20%);

  img {
    width: 100%;
    height: 100%;
    filter: contrast(1.2) brightness(1);
  }

  small {
    margin-top: 0.5rem;
    padding: 0.2rem 2rem;
    align-self: flex-start;

    font-size: 0.8rem;
  }

  h3 {
    font-size: 1.275rem;
    padding: 0.2rem 2rem;
    text-align: center;
    margin: 2rem 0 1rem 0;
  }

  h3 + p {
    padding: 0.2rem 2rem;
  }

  hr {
    margin-top: 2rem;
    align-self: flex-start;
    width: 50%;
  }

  hr + span {
    display: block;
    padding: 1rem 2rem;
  }

  @media (max-width: 700px) {
    max-width: 20.785rem;
  }
`;
