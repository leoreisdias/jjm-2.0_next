export const BigFadeSlideDownToUp = {
  begin: {
    scale: 1.8,
    y: 200,
    opacity: 0,
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.6,
    },
  },
};

export const SlideDownUp = {
  begin: {
    y: 200,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const FadeRightToLeft = {
  begin: {
    scale: 1.4,
    x: 200,
    opacity: 0,
  },
  animate: {
    scale: 1,
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const EaseFadeSlideDownToUp = {
  begin: {
    scale: 0.8,
    y: 30,
    opacity: 0,
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const SlowFadeDownToUpRightToLeft = {
  begin: {
    scale: 0.8,
    y: 50,
    x: 10,
    opacity: 0,
  },
  animate: {
    scale: 1,
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    scale: 0.6,
    y: 100,
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const SlowFadeInOut = {
  begin: {
    scale: 0.98,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    scale: 0.6,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const slowFadeInOutWithSlideDownUp = {
  begin: {
    scale: 0.96,
    y: 100,
    opacity: 0,
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  },
};
