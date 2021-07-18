import { rgba, shade } from 'polished';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  font-family: 'Nunito';

  background: url('/bgJJM.png');
  background-size: cover;
  background-position: center 30%;
  opacity: 0.95;
  height: 20rem;

  padding: 2rem 3rem;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray500};

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${(props) => props.theme.colors.white};

  div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
  }

  p {
    /* border-left: 1px solid ${(props) => props.theme.colors.gray50}; */
    font-size: 1.2rem;

    font-weight: 700;
  }

  div:nth-child(2) {
    /* margin-left: auto; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    align-self: flex-start;
    gap: 0.5rem;

    font-weight: 700;
  }
  a {
    text-decoration: none;
    font-size: 1.2rem;
    border-right: 1px solid ${(props) => props.theme.colors.white};
    padding-right: 0.5rem;
  }
  span:not(:last-child) {
    margin-left: auto;
    text-transform: capitalize;
    font-size: 1.2rem;
  }

  img {
    max-width: 8rem;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 2rem 2rem;

    div:first-child {
      margin-left: 0;
    }

    div:not(:first-child) {
      margin: 1rem auto 0 auto;
      flex-direction: column;
      a {
        border-right: none;
        padding-right: 0;
        padding: 0 8px;
        border-radius: 5px;
        background: ${(props) => rgba(shade(0.9, props.theme.colors.white), 0.2)};
      }
      .date {
        padding: 0 8px;
        border-radius: 5px;
        background: ${(props) => rgba(shade(0.9, props.theme.colors.white), 0.2)};
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
  gap: 0.8rem;
`;
