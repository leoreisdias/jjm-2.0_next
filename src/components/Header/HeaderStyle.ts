import { rgba, shade } from 'polished';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  font-family: 'Nunito';

  /* background: url('/bgJJM.png'); */
  background-size: cover;
  background-position: center 30%;
  opacity: 0.95;
  height: 10rem;

  /* clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%); */
  /* border-radius: 0 0 85% 85% / 30%; */

  padding: 2rem 3rem;

  /* border-bottom: 1px solid ${(props) => props.theme.colors.gray500}; */

  display: flex;
  align-items: center;
  justify-content: space-around;

  color: ${(props) => props.theme.colors.gray900};

  p {
    /* border-left: 1px solid ${(props) => props.theme.colors.gray50}; */
    font-size: 1.2rem;

    font-weight: 700;
  }

  div:nth-child(1) {
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
    }

    a {
      transition: 0.5s;
      text-decoration: none;
      font-size: 1.2rem;
      border-right: 1px solid ${(props) => props.theme.colors.white};
      /* padding-right: 0.5rem; */
      &:hover {
        color: ${(props) => props.theme.colors.jjmBlue};
      }
    }

    span:not(:last-child) {
      /* margin-left: auto; */
      text-transform: capitalize;
      font-size: 2rem;
    }

    img {
      max-width: 8rem;
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 2rem 2rem;

    div:first-child {
      margin: 1rem auto 0 auto;
      flex-direction: column;

      a {
        border-right: none;
        padding-right: 0;
      }

      span {
        margin: 0 auto;
      }
    }

    p {
      margin-left: 0rem;
      padding: 0.2rem 0rem 0 0rem;
      border-left: none;
      border-top: 1px solid ${(props) => props.theme.colors.gray100};
    }

    span {
      font-size: 1rem;
    }

    img {
      max-width: 4rem;
    }
  }
`;

export const SpanExit = styled.span`
  & svg {
    cursor: pointer;
  }

  border-radius: 5px;
  padding: 0.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props) => props.theme.colors.gray100};
  padding: 0 1rem;

  gap: 0.8rem;
`;
