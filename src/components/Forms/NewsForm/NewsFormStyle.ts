import { lighten } from 'polished';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  margin-top: 2rem;
  gap: 3rem;

  background: ${(props) => lighten(0.9, props.theme.colors.background)};

  border-radius: 10px;

  padding: 2rem;
  width: 100%;

  label {
    z-index: 0;
  }
`;

export const LabelEditor = styled.label`
  border-radius: 5px;

  min-height: 500px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 0.5rem;

  cursor: context-menu;
`;

export const LabelTopics = styled.label`
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 0.5rem;

  cursor: context-menu;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PreviewImageFile = styled.label`
  position: relative;

  .delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(25%, -25%);
    cursor: pointer;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;

    &:hover {
      scale: 1.2;
    }
  }

  img {
    height: 100px;
    width: 100px;
  }
`;

export const LabelImageFile = styled.label`
  margin-bottom: 20px;
  border: 1px dashed #ddd;
  cursor: pointer;
  height: 100px;
  width: 100px;

  display: flex;
  justify-content: center;

  input {
    display: none;
  }

  img {
    width: 50px;
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
  font-family: 'Nunito';

  &:hover {
    filter: brightness(0.9);
  }
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
