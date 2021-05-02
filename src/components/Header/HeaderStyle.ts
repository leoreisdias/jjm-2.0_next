import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: url('./bgJJM.png');
  background-size: cover;
  height: 10.5rem;

  padding: 2rem 4rem;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray500};

  display: flex;
  align-items: center;

  p {
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid ${(props) => props.theme.colors.gray50};
  }

  span {
    margin-left: auto;
    text-transform: capitalize;
  }

  img {
    max-width: 8rem;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    height: 100%;

    p {
      margin-left: 0rem;
      padding: 0.2rem 0rem 0 0rem;
      border-left: none;
      border-top: 1px solid ${(props) => props.theme.colors.gray100};
    }

    span {
      padding-top: 1rem;
    }
  }
`;
