import styled from 'styled-components';

export const Main = styled.main<{ login: boolean }>`
  margin: ${(props) => (props.login ? 0 : '20rem')} auto 2rem auto;

  display: flex;
  justify-content: center;

  transition: 1s;
`;
