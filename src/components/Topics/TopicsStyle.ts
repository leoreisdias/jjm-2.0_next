import styled from 'styled-components';

export const TopicsContainer = styled.main`
  position: fixed;
  top: 10.5rem;
  left: 0;
  width: 100%;
  padding: 1rem 0;

  display: none;
  opacity: 0;
  visibility: hidden;

  background: ${(props) => props.theme.colors.gray50};

  transition: 2s ease-in-out;

  &.active {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    opacity: 1;
    visibility: visible;
  }
`;

export const ButtonTopic = styled.button<{ active: boolean }>`
  padding: 10px 12px;
  border-width: 0;
  border-radius: 30px;

  font-size: 1rem;
  font-weight: ${(props) => (props.active ? 600 : 200)};
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.gray500};

  border: 1px solid ${(props) => props.theme.colors.gray100};

  background: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.white};

  transition: 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.primary};
  }
`;
