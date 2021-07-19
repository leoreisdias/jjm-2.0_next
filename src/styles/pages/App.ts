import { rgba } from 'polished';
import styled from 'styled-components';

export const Main = styled.main<{ login: boolean }>`
  margin: 2rem auto 0 auto;
  display: flex;
  padding-top: 17rem;
  justify-content: center;
  min-height: 100vh;

  transition: 1s;

  @media (max-width: 780px) {
    padding-top: 20rem;
  }
`;

export const ParallaxPageOne = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0 2000px ${(props) => rgba(props.theme.colors.jjmBlue, 0.4)};
  strong {
    color: ${(props) => props.theme.colors.white};
    font-size: 1.8rem;
    border-left: 1px solid white;
    margin-left: 1rem;
    padding-left: 1rem;
  }

  @media (max-width: 700px) {
    flex-direction: column;

    strong {
      border-left: none;
      margin-left: 0;
      padding-left: 0;
    }
  }

  @media (max-width: 480px) {
    strong {
      font-size: 1.4rem;
    }
  }
`;
