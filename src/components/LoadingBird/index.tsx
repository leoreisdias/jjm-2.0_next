import Lottie from 'react-lottie-player';

import Bird from '../../../public/lotties/loadingBird.json';

export const LoadingBird = () => {
  return (
    <>
      <Lottie
        loop={true}
        speed={1}
        play={true}
        animationData={Bird}
        direction={1}
        style={{ width: 150, height: 150, marginBottom: 10, alignSelf: 'center' }}
      />
    </>
  );
};
