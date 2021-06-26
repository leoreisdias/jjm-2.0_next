import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;

  background: url('/bgJJM.png');
  background-size: cover;
  height: 10.5rem;

  padding: 2rem 4rem;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray500};

  display: flex;
  align-items: center;
  justify-content: flex-start;

  p {
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid ${(props) => props.theme.colors.gray50};
  }

  div {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  span:not(:last-child) {
    margin-left: auto;
    text-transform: capitalize;
  }

  img {
    max-width: 8rem;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 2rem 2rem;

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
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
  border-radius: 5px;
  padding: 0.1rem;
  background: ${(props) => props.theme.colors.gray50};

  display: flex;

  margin-right: 0.2rem;
`;
