import { createContext, FC, ReactNode, useContext } from 'react';
import { TPageContext } from './PageContext.types';

const pageContext = createContext<TPageContext>({});

export const PageContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => <pageContext.Provider value={{}}>{children}</pageContext.Provider>;

export const usePageContext = () => useContext(pageContext);
