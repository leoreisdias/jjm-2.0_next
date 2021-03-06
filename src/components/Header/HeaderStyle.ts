import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  font-family: 'Nunito';

  background-size: cover;
  background-position: center 30%;
  opacity: 0.95;
  height: 10rem;

  padding: 2rem 3rem;

  color: ${(props) => props.theme.colors.title};

  /* margin-left: auto; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  gap: 0.5rem;

  font-weight: 700;

  & div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
  }

  a {
    transition: 0.5s;
    text-decoration: none;
    font-size: 1.2rem;
    &:hover {
      color: ${(props) => props.theme.colors.jjmPallete_1};
    }
  }

  img {
    max-width: 8rem;
  }

  p {
    font-size: 1.2rem;

    font-weight: 700;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 2rem 2rem;

    margin: 1rem auto 0 auto;

    a {
      border-right: none;
      padding-right: 0;
    }

    span {
      margin: 0 auto;
    }

    p {
      margin-left: 0rem;
      padding: 0.2rem 0rem 0 0rem;
      border-left: none;
      border-top: 1px solid ${(props) => props.theme.colors.gray100};
    }

    img {
      max-width: 4rem;
    }
  }

  @media (max-width: 260px) {
    span {
      font-size: 1rem;
    }
  }
`;

export const DateInfo = styled.span`
  text-transform: capitalize;
  font-size: 2rem;

  @media (max-width: 300px) {
    font-size: 1.5rem;
  }
`;

export const SpanExit = styled.span`
  & svg {
    cursor: pointer;
  }

  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props) => props.theme.colors.gray100};
  padding: 0.5rem 1rem;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  gap: 0.8rem;
`;
