import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface LayoutContextProps {
  isNavActive: boolean;
  handleNavActivation: () => void;
}

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutContext = createContext({} as LayoutContextProps);

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [isNavActive, setIsNavActive] = useState(true);

  function handleWindowScroll() {
    if (window.scrollY > 0) {
      setIsNavActive(false);
    } else {
      setIsNavActive(true);
    }
  }

  function handleNavActivation() {
    setIsNavActive(!isNavActive);
  }

  useEffect(() => {
    window.addEventListener('scroll', async () => {
      handleWindowScroll();
    });
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isNavActive,
        handleNavActivation,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
