import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PartnersContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ListImages = styled(motion.ul)`
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
