import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbContextType {
  overrideLabel?: string;
  setOverrideLabel: (value?: string) => void;
}

interface BreadcrumbProviderProps {
  children: ReactNode;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({ children }) => {
  const [overrideLabel, setOverrideLabel] = useState<string | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    setOverrideLabel(undefined);
  }, [location.pathname]);

  return (
    <BreadcrumbContext.Provider value={{ overrideLabel, setOverrideLabel }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = (): BreadcrumbContextType => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};
