import { motion } from 'framer-motion';
import { rgba } from 'polished';
import styled from 'styled-components';

export const CustomBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 1 !important;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props) => rgba(props.theme.colors.transitionBackground, 0.95)};
  color: #fff;
`;
