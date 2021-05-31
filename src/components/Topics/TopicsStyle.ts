import { motion } from 'framer-motion';
import styled from 'styled-components';

export const TopicsContainer = styled(motion.main)`
  position: absolute;
  top: 10.5rem;
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

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const ModalContent = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400;
  background-color: white;
  border: '2px solid #000';
  box-shadow: 1px 1px 1px black;
  padding: 2px;
`;
