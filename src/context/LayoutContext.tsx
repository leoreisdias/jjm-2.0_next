import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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

  function handleNavActivation() {
    setIsNavActive(!isNavActive);
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsNavActive(false);
        if (window.scrollY >= document.body.scrollHeight * 0.9) {
          console.log('Desceu tudo');
        }
      } else {
        setIsNavActive(true);
      }
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
