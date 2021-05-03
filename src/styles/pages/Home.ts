import styled from 'styled-components';

export const Wrapper = styled.section`
  color: ${(props) => props.theme.colors.text};
`;

export const Container = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  max-width: 1080px;
`;

export const Main = styled.main`
  align-self: flex-start;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;
