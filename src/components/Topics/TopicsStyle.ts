import { DialogContent } from '@material-ui/core';
import { motion } from 'framer-motion';
import { shade, lighten, complement } from 'polished';
import styled from 'styled-components';

export const TopicsContainer = styled(motion.main)`
  position: absolute;
  top: 8.5rem;
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
    top: 10rem;
  }
`;

export const ButtonTopic = styled(motion.button)<{ active: boolean }>`
  padding: 10px 12px;

  border-radius: 10px;

  font-size: 1rem;
  font-weight: ${(props) => (props.active ? 600 : 400)};
  color: ${(props) =>
    props.active ? props.theme.colors.white : shade(0.1, props.theme.colors.gray500)};

  border: 0.1px solid ${(props) => props.theme.colors.borderColor};

  background: ${(props) =>
    props.active ? lighten(0.1, props.theme.colors.jjmBlue) : props.theme.colors.white};

  transition: 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) =>
      props.active
        ? complement(lighten(0.1, props.theme.colors.jjmBlue))
        : complement(shade(0.4, props.theme.colors.white))};
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const CustomDialogContent = styled(DialogContent)`
  background: #f5fbff;
`;
