import { TConnector } from '@workspace/core/entities';
import { FC, ReactNode, createContext, useContext } from 'react';
import { TSectionDefinition, TSiteContext } from './SiteContext.types';
import { emptySiteContextData } from './SiteContext.utils';

const siteContext = createContext<TSiteContext>(emptySiteContextData);

export const useSiteContext = () => useContext(siteContext);

export const SiteContextProvider: FC<{
  children: ReactNode;
  connector: TConnector;
  sections: TSectionDefinition[];
}> = ({ children, connector, sections }) => {
  return (
    <siteContext.Provider value={{ connector, sections }}>
      {children}
    </siteContext.Provider>
  );
};
