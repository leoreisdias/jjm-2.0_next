import styled, { css } from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  margin-top: 2rem;
  gap: 3rem;

  background: ${(props) => props.theme.colors.white};

  border-radius: 10px;

  padding: 2rem;
  width: 100%;

  label {
    z-index: 0;
  }
`;

export const LabelEditor = styled.label`
  border: 1px solid ${(props) => props.theme.colors.gray200};
  border-radius: 5px;

  min-height: 300px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 0.5rem;

  cursor: context-menu;
`;

export const LabelImageFile = styled.label<{ hasImage: boolean }>`
  margin-bottom: 20px;
  border: 1px dashed #ddd;
  cursor: pointer;
  height: 400px;

  display: flex;
  justify-content: center;

  input {
    display: none;
  }

  img {
    width: 50px;
  }

  ${(props) =>
    props.hasImage &&
    css`
      border: 0;
      img {
        display: none;
      }
    `}
`;

export const CurrentImageLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1rem;

  strong {
    color: ${(props) => props.theme.colors.jjmPallete_1};
    font-size: 1.2rem;
  }
`;

export const SubmitButton = styled.button`
  border: none;
  border-radius: 5px;
  background: linear-gradient(
    217deg,
    ${(props) => props.theme.colors.jjmGreen},
    ${(props) => props.theme.colors.jjmPallete_1}
  );

  color: white;

  max-width: 200px;
  padding: 1rem 1.2rem;

  &:hover {
    filter: brightness(0.9);
  }
`;
