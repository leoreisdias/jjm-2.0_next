import { DialogContent } from '@material-ui/core';
import { motion } from 'framer-motion';
import { shade, lighten, complement } from 'polished';
import styled from 'styled-components';

export const TopicsContainer = styled(motion.main)`
  position: absolute;
  top: 9rem;
  left: 0;
  width: 100%;
  padding: 1rem 0;
  z-index: 1;
  height: 7rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  background: ${(props) => props.theme.colors.background};

  transition: 0.5s;

  .MuiPaper-root {
    width: 500px !important;
  }

  @media (max-width: 780px) {
    top: 11rem;
  }
  @media (max-width: 300px) {
    top: 12rem;
  }
`;

export const ButtonTopic = styled(motion.a)<{ active: boolean }>`
  padding: 10px 12px;

  border-radius: 10px;

  font-size: 1rem;
  font-weight: 600;
  color: ${(props) =>
    props.active
      ? props.theme.colors.white
      : props.theme.title == 'dark'
      ? shade(0.75, props.theme.colors.title)
      : lighten(0.1, props.theme.colors.title)};

  border: 0.1px solid ${(props) => props.theme.colors.borderColor};

  background: ${(props) =>
    props.active
      ? lighten(0.04, props.theme.colors.jjmPallete_1)
      : lighten(0.8, props.theme.colors.background)};

  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) =>
      props.active
        ? props.theme.title == 'dark'
          ? complement(shade(0.05, props.theme.colors.jjmPallete_1))
          : complement(lighten(0.1, props.theme.colors.jjmPallete_1))
        : lighten(0.04, props.theme.colors.jjmPallete_1)};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const CustomDialogContent = styled(DialogContent)`
  background: ${(props) => lighten(0.75, props.theme.colors.background)};
`;
