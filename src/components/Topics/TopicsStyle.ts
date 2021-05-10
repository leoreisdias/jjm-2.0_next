import { motion } from 'framer-motion';
import styled from 'styled-components';

export const TopicsContainer = styled(motion.main)`
  position: fixed;
  top: 10.5rem;
  left: 0;
  width: 100%;
  padding: 1rem 0;
  z-index: 1;
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  background: ${(props) => props.theme.colors.gray50};
`;

export const ButtonTopic = styled(motion.button)<{ active: boolean }>`
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
