import { AnimatePresence } from 'framer-motion';
import BeatLoader from 'react-spinners/BeatLoader';

import { SlowFadeInOut } from '../../assets/motion/Variants';
import { useTheme } from '../../hooks/useTheme';
import { WhiteBackdropWrapper } from './WhiteBackdropStyle';

export const WhiteBackdrop = () => {
  const { colors } = useTheme();
  return (
    <AnimatePresence exitBeforeEnter>
      <WhiteBackdropWrapper
        variants={SlowFadeInOut}
        initial="begin"
        animate="animate"
        exit="exit"
      >
        <BeatLoader color={colors.jjmPallete_1} size={30} />
      </WhiteBackdropWrapper>
    </AnimatePresence>
  );
};
